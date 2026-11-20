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

export async function punch(){
    var status = document.getElementById("status").innerText;
    if(status == "not punched in"){
        document.getElementById("status").innerText = "punched in";
        var name = localStorage.getItem('name');
        punch2(name);
        console.warn("punched in "+name);
    }
    else{
        document.getElementById("status").innerText = "not punched in";
        var name = localStorage.getItem('name');
        punch2(name);
        console.warn("punched out "+name);
        await hours(localStorage.getItem('name'));
        window.location.reload();
    }
    
}

 async function punch2(name){
    console.log("hi28");
  const docRef = await addDoc(collection(db, "punch-in"), {
    user: name,
  });
  console.log("document written with ID: ",docRef.id);
  const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
    
});};
  export async function hours(uid){
  const incompleteQuery = query(collection(db, "punch-in"));
 const incompleteSnapshot = await getDocs(incompleteQuery);
    console.log("hi60");
    const items = [];
    var total = 0;
    incompleteSnapshot.forEach((item) => {
      if(item.data().user == uid){
      items.push(item.data().timestamp);
      }
    });
    console.log(items);
    items.sort((a, b) => a.toMillis() - b.toMillis());
    console.log("2: "+items);
    for(var i=0;i<items.length;i+=2){
      console.log(i+": "+Math.round(items[i+1]-items[i]));
      console.log(!Number.isNaN(Math.round((items[i+1]-items[i]))));
      if(!Number.isNaN(Math.round((items[i+1]-items[i])))){
      total += Math.round((items[i+1]-items[i]));
      };
    }
    if(total > 3600 ){
      document.getElementById("hoursHeader").innerText = "number of Hours";
      total /= 3600;
    }
    else if(total > 60 ){
      document.getElementById("hoursHeader").innerText = "number of MINUTES";
      total = Math.round((total/60)*100)/100;
    }
    else{
      document.getElementById("hoursHeader").innerText = "number of SECONDS";
    }
    console.log("total: "+total);
    document.getElementById("hours").innerText = total;
  }
  