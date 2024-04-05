import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDwSg8WUJtIAp_BUIp9ptMOBHrJ59u4ruM",
  authDomain: "hackmlh-ffe85.firebaseapp.com",
  projectId: "hackmlh-ffe85",
  storageBucket: "hackmlh-ffe85.appspot.com",
  messagingSenderId: "100289480982",
  appId: "1:100289480982:web:bd6a30b8d26134aa61a837"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth()

export {app};
export {db};
