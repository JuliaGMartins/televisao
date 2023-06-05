// firebase config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAQ4V4owEqpJWlqSmIz_ROuiNLv578ZCgI",
  authDomain: "tele-visao-app.firebaseapp.com",
  projectId: "tele-visao-app",
  storageBucket: "tele-visao-app.appspot.com",
  messagingSenderId: "198018780407",
  appId: "1:198018780407:web:3eb648dd717ed5484417f2", 
  measurementId: "G-HJ9HTF3GHJ"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase, 'gs://tele-visao-app.appspot.com/');

// export const storage = getStorage(app, 'gs://tele-visao-224f7.appspot.com/');

export default { firebase, auth, db };