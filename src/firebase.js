import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAVk4m35HpmPoi0Rr1K495lVyfskmVDiD4",
  authDomain: "devsgiveback.firebaseapp.com",
  databaseURL: "https://devsgiveback.firebaseio.com",
  projectId: "devsgiveback",
  storageBucket: "devsgiveback.appspot.com",
  messagingSenderId: "171321681886"
};
firebase.initializeApp(config);
export default firebase;