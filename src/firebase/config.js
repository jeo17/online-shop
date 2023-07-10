// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGxQ5MqLvjjEn6Yxk2UDTJMLPbtJa8mtg",
  authDomain: "e-cemmerce-med.firebaseapp.com",
  projectId: "e-cemmerce-med",
  storageBucket: "e-cemmerce-med.appspot.com",
  messagingSenderId: "366224778363",
  appId: "1:366224778363:web:1a362686217bbb977aeede",
  measurementId: "G-TGX0J59335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

