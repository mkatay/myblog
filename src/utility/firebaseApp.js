// Import the functions you need from the SDKs you need
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//az adatbázisunk eléréshez kell példányosítani az adatbázis referenciából
export const db = getFirestore(app);
//az authentikáscióhoz szükséges referencia:
export const auth = getAuth(app);
export const storage=getStorage(app)