import admin from "firebase-admin";

export default abstract class BaseDao{

    protected db:admin.firestore.Firestore;

    protected constructor(db:admin.firestore.Firestore){
        this.db=db;
    }

    /**
     * Deletes a collection. 
     * To do that it deletes all documents belonging to the  collection.
     * The method is copied from Firebase's documentation @see https://firebase.google.com/docs/firestore/manage-data/delete-data
     * The operation is possible to be implemented with Firebase Cloud Functions, but it too much complexity for this project. 
     */
    protected deleteCollection=(collectionPath:string, batchSize:number) =>{
        let collectionRef = this.db.collection(collectionPath);
        let query = collectionRef.orderBy('__name__').limit(batchSize);
      
        return new Promise((resolve, reject) => {
          this.deleteQueryBatch(query, batchSize, resolve, reject);
        });
      }
      
    protected deleteQueryBatch=(query:FirebaseFirestore.Query, batchSize:number, resolve:()=>void, reject:()=>void)=> {
        query.get()
          .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
              return 0;
            }
      
            // Delete documents in a batch
            let batch = this.db.batch();
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
              this.deleteQueryBatch(query, batchSize, resolve, reject);
            });
          })
          .catch(reject);
      }
}