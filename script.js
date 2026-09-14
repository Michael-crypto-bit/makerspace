// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { arrayRemove, serverTimestamp, deleteDoc, where, query, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

export const showItems = async function(){
 const itemsToDo = document.getElementById("output");
 itemsToDo.innerHTML = "";

 const incompleteQuery = query(collection(db, "makerspace"));
 const incompleteSnapshot = await getDocs(incompleteQuery);
 console.log("firebase successfully read"); 
 console.log(incompleteQuery);
 incompleteSnapshot.forEach((item) => {
  const newPar = document.createElement("label");
  newPar.innerHTML = item.data().name;
  console.log(item.data().name);
  newPar.htmlFor = item.id;
  const newPar2 = document.createElement("label");
  if(item.data().category != undefined){
  newPar2.innerHTML = item.data().category;
  newPar2.htmlFor = item.id;
  }

  itemsToDo.appendChild(newPar);
  itemsToDo.appendChild(document.createElement("br"));
  itemsToDo.appendChild(newPar2);
}
);
};