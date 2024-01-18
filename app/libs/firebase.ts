// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD15i6LGR6NriM5HIIVH0zzFqLwTS0BLtM",
  authDomain: "airbnb-clone-410806.firebaseapp.com",
  projectId: "airbnb-clone-410806",
  storageBucket: "airbnb-clone-410806.appspot.com",
  messagingSenderId: "861773172555",
  appId: "1:861773172555:web:af9428a90538e2b687e2ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
