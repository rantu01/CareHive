// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYozU6SdZmypDCIZ9QhwBRP626IL15fM8",
  authDomain: "carehive-86ab3.firebaseapp.com",
  projectId: "carehive-86ab3",
  storageBucket: "carehive-86ab3.firebasestorage.app",
  messagingSenderId: "226425455907",
  appId: "1:226425455907:web:1cef103bebb3b1038e7896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);