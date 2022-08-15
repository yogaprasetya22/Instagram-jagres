// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWNna6zmMDwagFjpBsXP3fOKtuGYtY2_c",
    authDomain: "instagram-clone-f49d5.firebaseapp.com",
    projectId: "instagram-clone-f49d5",
    storageBucket: "instagram-clone-f49d5.appspot.com",
    messagingSenderId: "179528225127",
    appId: "1:179528225127:web:2d4ead6b1d36a38a971fc2",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
