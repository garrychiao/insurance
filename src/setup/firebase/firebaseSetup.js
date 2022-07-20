// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default function firebaseSetup() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDwkokCrVW8lCsZ_5P6tLrp52xtaLs-b_U",
    authDomain: "insurance-test-73e2a.firebaseapp.com",
    projectId: "insurance-test-73e2a",
    storageBucket: "insurance-test-73e2a.appspot.com",
    messagingSenderId: "786799054532",
    appId: "1:786799054532:web:171559d4f4c604922b0391",
    measurementId: "G-L6HTNZVZEL"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {app, db}
}
