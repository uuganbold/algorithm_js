import admin from "firebase-admin";

export default abstract class BaseDao{

    /**
     * Deletes a collection. 
     * To do that it deletes all documents belonging to the  collection.
     * The method is copied from Firebase's documentation @see https://firebase.google.com/docs/firestore/manage-data/delete-data
     * The operation is possible to be implemented with Firebase Cloud Functions, but it too much complexity for this project. 
     */
    protected deleteCollection=(db:admin.firestore.Firestore,collectionPath:string, batchSize:number) =>{
        let collectionRef = db.collection(collectionPath);
        let query = collectionRef.orderBy('__name__').limit(batchSize);
      
        return new Promise((resolve, reject) => {
          this.deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
      }
      
    protected deleteQueryBatch=(db:admin.firestore.Firestore, query:FirebaseFirestore.Query, batchSize:number, resolve:()=>void, reject:()=>void)=> {
        query.get()
          .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
              return 0;
            }
      
            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach((doc) => {
              batch.delete(doc.ref);
            });
      
            return batch.commit().then(() => {
              return snapshot.size;
            });
          }).then((numDeleted) => {
            if (numDeleted === 0) {
              resolve();
              return;
            }
      
            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
              this.deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
          })
          .catch(reject);
      }
}