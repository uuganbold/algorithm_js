import * as admin from 'firebase-admin';

let serviceAccount = require('../../config/mydemoproject-9604c-firebase-adminsdk-kazs6-1247913e40.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin.firestore();