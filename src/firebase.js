import firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCHEGeRBdrI0vKuB1MhU5S79DpPTR8zgQY",
    authDomain: "react-crud-d3ecd.firebaseapp.com",
    databaseURL: "https://react-crud-d3ecd-default-rtdb.firebaseio.com",
    projectId: "react-crud-d3ecd",
    storageBucket: "react-crud-d3ecd.appspot.com",
    messagingSenderId: "1068801752",
    appId: "1:1068801752:web:62afbfff967a89d06f01ad"
  };
  // Initialize Firebase
  const fireDB = firebase.initializeApp(firebaseConfig);


  export default fireDB.database().ref();
