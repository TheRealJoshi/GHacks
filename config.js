// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX8wJS-UAjEB5Yu375e6FIaEg7NPC8rI4",
  authDomain: "eatinerary-47a80.firebaseapp.com",
  projectId: "eatinerary-47a80",
  storageBucket: "eatinerary-47a80.appspot.com",
  messagingSenderId: "658342704317",
  appId: "1:658342704317:web:1c09f27d7fa6b6025af3d4",
  measurementId: "G-WGL14ZYTS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);