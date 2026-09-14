// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { arrayRemove, serverTimestamp, deleteDoc, where, query, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyDDuxw8usHrNnpBSFVG7QL4VQ0Iqwj3W2g",
//   authDomain: "softwareengineering-e29f1.firebaseapp.com",
//   projectId: "softwareengineering-e29f1",
//   storageBucket: "softwareengineering-e29f1.appspot.com",
//   messagingSenderId: "232142952313",
//   appId: "1:232142952313:web:dff5ac81bad1bce13c81a8"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);