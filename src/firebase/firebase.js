import firebase from 'firebase';
import { firebaseKey } from './apiKeys';

const config = {
  apiKey: firebaseKey,
  authDomain: "devsgiveback.firebaseapp.com",
  databaseURL: "https://devsgiveback.firebaseio.com",
  projectId: "devsgiveback",
  storageBucket: "devsgiveback.appspot.com",
  messagingSenderId: "171321681886"
};
firebase.initializeApp(config);

export default firebase;