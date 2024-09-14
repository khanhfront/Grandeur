// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPdqqnSpfwGBc7Bfbvw7HlROnf-faCnA",
  authDomain: "grandeur-1aa6e.firebaseapp.com",
  projectId: "grandeur-1aa6e",
  storageBucket: "grandeur-1aa6e.appspot.com",
  messagingSenderId: "1063092528999",
  appId: "1:1063092528999:web:2911f0eb22d64f2bad31c2",
  measurementId: "G-EWJMLFYCKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
