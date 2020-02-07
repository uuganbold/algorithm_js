import * as admin from 'firebase-admin';

let serviceAccount = require('../../.local_config/firebase.json');

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin.firestore();