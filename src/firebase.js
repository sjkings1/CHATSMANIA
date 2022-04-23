import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDAVhdP7DRqaX_ztpKZXWPqHw2IQ2xWlvA",
  authDomain: "chatsmania-3af75.firebaseapp.com",
  projectId: "chatsmania-3af75",
  storageBucket: "chatsmania-3af75.appspot.com",
  messagingSenderId: "301701346174",
  appId: "1:301701346174:web:a22c68e486dd632da6f92f",
  measurementId: "G-JDKWEK0K96"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
