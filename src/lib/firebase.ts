import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7zHE2tm3m_cnrUkx4jT8GoMQ2nRZ1Xs8",
    authDomain: "todo-app-93d3c.firebaseapp.com",
    projectId: "todo-app-93d3c",
    storageBucket: "todo-app-93d3c.appspot.com",
    messagingSenderId: "383826449311",
    appId: "1:383826449311:web:a54985d248319bc7fc63aa",
    measurementId: "G-38QG05ZFSY"
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };