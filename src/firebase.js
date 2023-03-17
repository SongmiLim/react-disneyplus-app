// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBytJ1itZOu-_XKmlpuopblbFy-3g--rCo",
  authDomain: "react-disney-app-cf7cc.firebaseapp.com",
  projectId: "react-disney-app-cf7cc",
  storageBucket: "react-disney-app-cf7cc.appspot.com",
  messagingSenderId: "584846478339",
  appId: "1:584846478339:web:64f195a964952ea1599236"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;