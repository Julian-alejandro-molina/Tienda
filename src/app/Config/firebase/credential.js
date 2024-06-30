// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCS9pGs9Ngx1vzbAnEcRDT9h9yoHE1Dl8Q",
  authDomain: "app-tienda-a5a72.firebaseapp.com",
  projectId: "app-tienda-a5a72",
  storageBucket: "app-tienda-a5a72.appspot.com",
  messagingSenderId: "667017444427",
  appId: "1:667017444427:web:f10082929b533c8ecb61ce",
  measurementId: "G-34VD9E4BRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);