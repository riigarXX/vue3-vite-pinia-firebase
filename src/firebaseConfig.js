import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyDNSA1KZLKWo-CohTvVCto7u3zkZTmCbmU",
  authDomain: "vue-3-2022-f8d76.firebaseapp.com",
  projectId: "vue-3-2022-f8d76",
  storageBucket: "vue-3-2022-f8d76.appspot.com",
  messagingSenderId: "418723487280",
  appId: "1:418723487280:web:491308a18d8e0bef2d97f5",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
export { auth, db };
