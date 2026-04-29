import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdz0F2GAhiUOMyQ_D8R1-7xKWKSWcO1Fo",
  authDomain: "fyp-proposal-ai.firebaseapp.com",
  projectId: "fyp-proposal-ai",
  storageBucket: "fyp-proposal-ai.firebasestorage.app",
  messagingSenderId: "677859000462",
  appId: "1:677859000462:web:f54eae7e236201b4be89df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;