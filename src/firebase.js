import firebase from "firebase/app"
import "firebase/database"
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "@firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCG5sxag6VnfKpfJbfKb-wecRzPEz3-TCo",
    authDomain: "react-student-50dfa.firebaseapp.com",
    projectId: "react-student-50dfa",
    storageBucket: "react-student-50dfa.appspot.com",
    messagingSenderId: "993303922248",
    appId: "1:993303922248:web:28c041a9ce7ed5dc59fa7d"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();