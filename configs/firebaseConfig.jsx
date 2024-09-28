// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-39b81.firebaseapp.com",
  projectId: "ai-course-generator-39b81",
  storageBucket: "ai-course-generator-39b81.appspot.com",
  messagingSenderId: "853447356890",
  appId: "1:853447356890:web:de39516b04b5968204d0e3",
  measurementId: "G-XZ3KF5FE7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app)