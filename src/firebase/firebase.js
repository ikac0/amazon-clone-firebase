import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBZVJK1jXFFuBxs1V7S7D_2z9_BjooFQZA",
  authDomain: "clone-c113d.firebaseapp.com",
  projectId: "clone-c113d",
  storageBucket: "clone-c113d.appspot.com",
  messagingSenderId: "649576604985",
  appId: "1:649576604985:web:99ecfa65aaaf5c1aca34e8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// quick access /shortcut to the database in firebase
const db = firebaseApp.firestore();

//quick access/shortcut to the auth in firebase
const auth = firebase.auth();

export { db, auth };
