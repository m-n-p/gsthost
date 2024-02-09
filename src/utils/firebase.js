import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBEix3bdfAjD5Fn5jTvQbZRfwp8EZCzfew",
  authDomain: "mnpai-d9a71.firebaseapp.com",
  projectId: "mnpai-d9a71",
  storageBucket: "mnpai-d9a71.appspot.com",
  messagingSenderId: "364267239929",
  appId: "1:364267239929:web:1d107dd2e54cd1c1b72528",
  measurementId: "G-BWH34ZWET8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
