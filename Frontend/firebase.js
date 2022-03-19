import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

import { getFirestore } from "firebase/firestore"


const firebaseConfig= {
    apiKey: "AIzaSyBkfnLv8IktuIPTpvV1U1tERonT4DibcRQ",

    authDomain: "research-paper-recommend-e0bf4.firebaseapp.com",
  
    databaseURL: "https://research-paper-recommend-e0bf4-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "research-paper-recommend-e0bf4",
  
    storageBucket: "research-paper-recommend-e0bf4.appspot.com",
  
    messagingSenderId: "382923158654",
  
    appId: "1:382923158654:web:778b734239f2eb5521942f",
  
    measurementId: "G-84J7BZX3CG"
  
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();


export const auth = getAuth(firebaseApp);


export default firebaseApp
