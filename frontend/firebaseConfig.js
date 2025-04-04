// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqZTxm4J4bBoQPISMWV2sQRtfDwhiDroI",
  authDomain: "learnadoodle.firebaseapp.com",
  projectId: "learnadoodle",
  storageBucket: "learnadoodle.firebasestorage.app",
  messagingSenderId: "994009379458",
  appId: "1:994009379458:web:63548be29d3cac971b3a9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
