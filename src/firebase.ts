import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9i8LRz1N2AKAYH6VimWb6EkYeBZxFdXs",
  authDomain: "halad-share-24cb9.firebaseapp.com",
  projectId: "halad-share-24cb9",
  storageBucket: "halad-share-24cb9.firebasestorage.app",
  messagingSenderId: "388740004879",
  appId: "1:388740004879:web:f6fce03ed321caee5ff77a",

  //   apiKey: "AIzaSyC9i8LRz1N2AKAYH6VimWb6EkYeBZxFdXs",
  //   authDomain: "halad-share-24cb9.firebaseapp.com",
  //   projectId: "halad-share-24cb9",
  //   storageBucket: "halad-share-24cb9.firebasestorage.app",
  //   messagingSenderId: "388740004879",
  //   appId: "1:388740004879:web:f6fce03ed321caee5ff77a",
  //   measurementId: "G-TBPS1RKPBX"
};

const app = initializeApp(firebaseConfig);
// Export Storage and Firestore instances
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
