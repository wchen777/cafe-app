import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase config file
const firebaseConfig = {
  apiKey: "AIzaSyAYNbgLKZlupLeBP50vcPb7JbFqmbyMfsY",
  authDomain: "cafe-social-network.firebaseapp.com",
  databaseURL: "https://cafe-social-network-default-rtdb.firebaseio.com",
  projectId: "cafe-social-network",
  storageBucket: "cafe-social-network.appspot.com",
  messagingSenderId: "315587975699",
  appId: "1:315587975699:web:b463aeef11b74551793de6",
  measurementId: "G-6T3JW9H3Z2"
};

firebase.initializeApp(firebaseConfig);