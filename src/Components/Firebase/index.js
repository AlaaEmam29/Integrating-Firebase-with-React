// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from 'firebase/auth'
import { getDatabase, ref, set , onValue } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,

  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};


// Initialize Firebase

export class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();
    this.db = getDatabase(this.app)
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  }  

  doSignInWithPopupGoogle = () => {
    signInWithPopup(this.auth, this.googleProvider);
  };

  doSignOut = () => {
   return  signOut(this.auth);
  };

  doPasswordReset = (email) => {
    return sendPasswordResetEmail(this.auth, email);
  };

  doPasswordUpdate = (password) => {
 return   updatePassword(this.auth.currentUser, password);
  };
  user = (uid) => {
    return ref(this.db, `users/${uid}`);
  };

  users = () => {
    return ref(this.db, 'users');
  };

  setUser = (uid, userData) => {
    return set(this.user(uid), userData);
  };


    getUsersValues = (callback) => {
    const usersRef = this.users();
    onValue(usersRef, (snapshot) => {
      callback(snapshot);
    });
  };

}
