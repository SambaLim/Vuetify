import firebase from 'firebase/app'
import 'firebase/firestore'
  
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBxklL1mc8LLRXFGrkCiaZ0aN-lXzhah24",
    authDomain: "todo-3ds.firebaseapp.com",
    databaseURL: "https://todo-3ds.firebaseio.com",
    projectId: "todo-3ds",
    storageBucket: "todo-3ds.appspot.com",
    messagingSenderId: "763863049032",
    appId: "1:763863049032:web:3090f4327f03ed5e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Connect Firestore
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;