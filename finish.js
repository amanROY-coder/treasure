// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// YOUR FIREBASE PROJECT
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyBAOyDtt9aODoo-5jTNGVOJGIcTuS2pVEk",

    authDomain: "treasure-edc7a.firebaseapp.com",

    projectId: "treasure-edc7a",

    storageBucket: "treasure-edc7a.firebasestorage.app",

    messagingSenderId: "370342872714",

    appId: "1:370342872714:web:3fce530217b3a3e1f14f73",

    measurementId: "G-C6EFHJDQJN"

};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);


// ==========================================
// INITIALIZE FIRESTORE
// ==========================================

export const db = getFirestore(app);
