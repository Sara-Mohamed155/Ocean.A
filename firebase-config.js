// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzOXJHsiKddSSGtLYOoVpGyU5mHiL3KSM",
  authDomain: "gr433-5068f.firebaseapp.com",
  databaseURL: "https://gr433-5068f-default-rtdb.firebaseio.com",
  projectId: "gr433-5068f",
  storageBucket: "gr433-5068f.appspot.com",
  messagingSenderId: "66032842132",
  appId: "1:66032842132:web:1a20785ed1ae175e9b8b81",
  measurementId: "G-TS9TLZ7ZMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };
