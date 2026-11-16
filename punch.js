import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { arrayRemove, serverTimestamp, deleteDoc, where, query, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCinc3NEqDVIxyM4fJ7P8CRo4xMAc1IaXg",
    authDomain: "makerspace-18269.firebaseapp.com",
    projectId: "makerspace-18269",
    storageBucket: "makerspace-18269.firebasestorage.app",
    messagingSenderId: "343570133102",
    appId: "1:343570133102:web:5311039f12a0af24e8367f",
    measurementId: "G-ME346D5CEX"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const incompleteQuery = query(collection(db, "punch-in"));
 const incompleteSnapshot = await getDocs(incompleteQuery);
 console.warn("firebase punchlist successfully read"); 

export function punch(){
    var status = document.getElementById("status").innerText;
    if(status == "not punched in"){
        document.getElementById("status").innerText = "punched in";
        var name = localStorage.getItem('name');
        punch2(name, true);
        console.warn("punched in "+name);
    }
    else{
        document.getElementById("status").innerText = "not punched in";
        var name = localStorage.getItem('name');
        punch2(name, false);
        console.warn("punched out "+name);
    }
}

 async function punch2(name, inOrOut){
    console.log("hi28");
  const docRef = await addDoc(collection(db, "punch-in"), {
    user: name,
    inOrOut: inOrOut,
  });
  console.log("document written with ID: ",docRef.id);
  const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
    
});};