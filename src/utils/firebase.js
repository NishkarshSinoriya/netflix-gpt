// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2uprUKacZm47tdO0LJsqlOeuXJGmmTcI",
  authDomain: "netflixgpt-97e2d.firebaseapp.com",
  projectId: "netflixgpt-97e2d",
  storageBucket: "netflixgpt-97e2d.appspot.com",
  messagingSenderId: "861079082696",
  appId: "1:861079082696:web:bcd50b65f1becbd6d237fd",
  measurementId: "G-X5LM9Q6FLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
