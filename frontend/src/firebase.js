// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTSdfl_3g8cbJfqeMnHRarAY80kd17QEY",
  authDomain: "chaos-rank.firebaseapp.com",
  projectId: "chaos-rank",
  storageBucket: "chaos-rank.firebasestorage.app",
  messagingSenderId: "489215728872",
  appId: "1:489215728872:web:b978a64c47cc7cd12c3d5d",
  measurementId: "G-701TKKSHZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore, firebaseConfig };