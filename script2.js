// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import {arrayRemove, serverTimestamp, deleteDoc, where, query, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import {  getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCinc3NEqDVIxyM4fJ7P8CRo4xMAc1IaXg",
  authDomain: "makerspace-18269.firebaseapp.com",
  projectId: "makerspace-18269",
  storageBucket: "makerspace-18269.firebasestorage.app",
  messagingSenderId: "343570133102",
  appId: "1:343570133102:web:5311039f12a0af24e8367f",
  measurementId: "G-ME346D5CEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const adminSignIn = async function(){
    const adminEmail = document.getElementById('adminEmail').value;
    const password = document.getElementById('aPassword').value;

    signInWithEmailAndPassword(auth, adminEmail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed in as:', user.email);
            const incompleteQuery = query(collection(db, "users"));
            const incompleteSnapshot = getDocs(incompleteQuery);
                console.warn("firebase successfully read"); 
            incompleteSnapshot.forEach((item) => {
            if(userCredential.uid == item.data().uid){
                if(item.data().admin == true){
                    localStorage.setItem('admin', true);
                    window.location.href = 'adminLogin.html';
                }
                else{
                    window.location.href = 'login.html';
                }
            }});
        })
        .catch((error) => {
            console.error('Sign in error:', error.message);
        });
};

export const studentSignIn = async function(){
    const studentEmail = document.getElementById('studentEmail').value;
    const password = document.getElementById('sPassword').value;

    signInWithEmailAndPassword(auth, studentEmail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed in as:', user.email);
            localStorage.setItem('admin', false);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error('Sign in error:', error.message);
        });
};

export const showStudentWindow = async function(){
  const form = document.getElementById('studentLoginForm');

  const currentDisplay = window.getComputedStyle(form).display;
  if (currentDisplay === 'none' || form.style.display === '') {
      form.style.display = 'block'; 
  } else {
      form.style.display = 'none';
  }
};

export const showAdminWindow = async function(){
  const form = document.getElementById('adminLoginForm');

  const currentDisplay = window.getComputedStyle(form).display;
  if (currentDisplay === 'none' || form.style.display === '') {
      form.style.display = 'block'; 
  } else {
      form.style.display = 'none';
  }
};