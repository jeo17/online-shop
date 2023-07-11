import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth"; 

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
export const provider = new GoogleAuthProvider();
export const provider2 = new FacebookAuthProvider();

