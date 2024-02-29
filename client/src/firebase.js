import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-f3718.firebaseapp.com",
    projectId: "mern-auth-f3718",
    storageBucket: "mern-auth-f3718.appspot.com",
    messagingSenderId: "485223195050",
    appId: "1:485223195050:web:a888b6380ee86e0cf58bd3"
};

export const app = initializeApp(firebaseConfig);