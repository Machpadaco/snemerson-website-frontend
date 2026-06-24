// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCD-XY4_D1KyJVJNagNNKsFKefH3YTG0sg",
    authDomain: "snemerson-3aa47.firebaseapp.com",
    projectId: "snemerson-3aa47",
    storageBucket: "snemerson-3aa47.appspot.com",
    messagingSenderId: "277130922072",
    appId: "1:277130922072:web:95042d353a0ed7104a622d",
    measurementId: "G-X7207KFY1E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log("Firebase Initialized Successfully");
