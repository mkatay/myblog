// Import the functions you need from the SDKs you need
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getAuth} from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)



  
  