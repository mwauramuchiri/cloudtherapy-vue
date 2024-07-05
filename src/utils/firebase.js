import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiwIV93BfMeod71CWd0b4CQolhVSZ3JBs",
  authDomain: "ementoring-afric-1536067843571.firebaseapp.com",
  databaseURL: "https://ementoring-afric-1536067843571.firebaseio.com",
  projectId: "ementoring-afric-1536067843571",
  storageBucket: "ementoring-afric-1536067843571.appspot.com",
  messagingSenderId: "326943472089",
  appId: "1:326943472089:web:62746b071cf283f58bc1c8"
};

// Initialize Firebase app
const apps = getApps();
const app = apps.length ? apps[0] : initializeApp(firebaseConfig);

// Get references to authentication and firestore services
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };
