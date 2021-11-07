import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlCeauan3Y4VcMNqMzpNv8dGMKdubBR4E",
    authDomain: "noteskeepers.firebaseapp.com",
    projectId: "noteskeepers",
    storageBucket: "noteskeepers.appspot.com",
    messagingSenderId: "349974173689",
    appId: "1:349974173689:web:a2bb7b75a7d91b10174f28",
    measurementId: "G-FNFGL8YH49",
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const auth = getAuth();

export default firebaseConfig;
