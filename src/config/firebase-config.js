// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xeRAwEK29RGmkwW9EZqCxcgv7R3rcok",
  authDomain: "fx-chat-65574.firebaseapp.com",
  projectId: "fx-chat-65574",
  storageBucket: "fx-chat-65574.appspot.com",
  messagingSenderId: "1014834671094",
  appId: "1:1014834671094:web:671a6c0698d09643bfabd7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
