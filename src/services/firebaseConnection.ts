
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCl1onh4QQ7vBgF8m-QFh3VIk5X1_1F5Yw",
  authDomain: "webcarros-78588.firebaseapp.com",
  projectId: "webcarros-78588",
  storageBucket: "webcarros-78588.appspot.com",
  messagingSenderId: "79515990623",
  appId: "1:79515990623:web:bd0b72ef84e073e9f5f9ea"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export{db, auth, storage}