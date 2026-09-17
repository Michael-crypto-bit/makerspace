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

 const incompleteQuery = query(collection(db, "makerspace"), where("completed", "==", false));
 const incompleteSnapshot = await getDocs(incompleteQuery);
 console.warn("firebase successfully read"); 
 console.info(incompleteQuery);
 incompleteSnapshot.forEach((item) => {
  const newPar = document.createElement("label");
  newPar.innerHTML = item.data().name;
  newPar.htmlFor = item.id;
  const newPar2 = document.createElement("label");
  if(item.data().category != undefined){
  newPar2.innerHTML = item.data().category;
  newPar2.htmlFor = item.id;
  }

  const newPar3 = document.createElement("label");
  newPar3.innerHTML = ": ";
  newPar3.htmlFor = item.id;

  const newPar4 = document.createElement("label");
  const newPar5 = document.createElement("label");
  if(item.data().inProgress != undefined){
  newPar4.innerHTML = item.data().inProgress;
  newPar4.htmlFor = item.id;
  newPar5.innerHTML = "<br><br>in progress: ";
  newPar5.htmlFor = item.id;
  }
  const checkbox = document.createElement("button");
  if(item.data().inProgress == false){

  checkbox.innerHTML = "claim";
  checkbox.onclick = async function(){
    await updateDoc(doc(db, "makerspace", item.id), {inProgress: true, user: "Michael"});
    showItems();
  };
    }
  else{
  checkbox.innerHTML = "complete";
  checkbox.onclick = async function(){
    await updateDoc(doc(db, "makerspace", item.id), {completed: true, inProgress: false, user: "Michael"});
    showItems();
  };
  }

  const newPar6 = document.createElement("label");
  const newPar7 = document.createElement("label");
  if(item.data().user != ""){
  newPar6.innerHTML = item.data().user;
  newPar6.htmlFor = item.id;
  newPar7.innerHTML = "<br>user: ";
  newPar7.htmlFor = item.id;
  }
  else{
    newPar6.innerHTML = "<strong><br>unclaimed</strong>";
    newPar6.htmlFor = item.id;
  }

  itemsToDo.appendChild(newPar2);
  itemsToDo.appendChild(newPar3);
  itemsToDo.appendChild(document.createElement("br"));
  itemsToDo.appendChild(newPar);
  itemsToDo.appendChild(checkbox);
  itemsToDo.appendChild(newPar5);
  itemsToDo.appendChild(newPar4);
  itemsToDo.appendChild(newPar7);
  itemsToDo.appendChild(newPar6);
  itemsToDo.appendChild(document.createElement("br"));itemsToDo.appendChild(document.createElement("br"));
  
}
);
};
export function punch(){
    console.log("hi");
    // var status = document.getElementById("statuş").innerText;
    // if(status == "not punched in"){
    //     document.getElementById("status").innerText = "punched in";
    // }
    // else{
    //     document.getElementById("status").innerText = "not punched in";
    // }
}

export const addItem = async function(item){
  const docRef = await addDoc(collection(db, "makerspace"), {
    // if(document.getElementById("newItem").value == ""){break: any}
    name: item,
    completed: false,
    user: "",
    inProgress: false,
    category: "McAvoy"
  });
  console.log("document written with ID: ",docRef.id);
  const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
    
});
// console.log("timesetamp: "+serverTimestamp());
  document.getElementById("input").value = "";
}