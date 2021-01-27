import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6liEYxa6wlv20tBO9wDxa20YpOkwKaeA",
  authDomain: "clone-f8cb2.firebaseapp.com",
  projectId: "clone-f8cb2",
  storageBucket: "clone-f8cb2.appspot.com",
  messagingSenderId: "885876781197",
  appId: "1:885876781197:web:8ca829c3b8866fd53eb2c4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// quick access /shortcut to the database in firebase
const db = firebaseApp.firestore();

//quick access/shortcut to the auth in firebase
const auth = firebase.auth();

export { db, auth };
