import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-81xuA9yohCgrs_18-zfpu1UvjFOP-GU",
    authDomain: "malthe-kea.firebaseapp.com",
    projectId: "malthe-kea",
    storageBucket: "malthe-kea.firebasestorage.app",
    messagingSenderId: "1061298879780",
    appId: "1:1061298879780:web:82e5b57f3419ecab36c7b1",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);