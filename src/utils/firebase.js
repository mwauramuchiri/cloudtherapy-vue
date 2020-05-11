import firebase from "firebase";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABp8joIlXkM8mTfqlWkU0WtoB9H4VLL98",
  authDomain: "ltai-9957c.firebaseapp.com",
  databaseURL: "https://ltai-9957c.firebaseio.com",
  projectId: "ltai-9957c",
  storageBucket: "ltai-9957c.appspot.com",
  messagingSenderId: "786673713024",
  appId: "1:786673713024:web:92e4963ede74ea100e8b65",
  measurementId: "G-GTQJ3K8QGK"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
