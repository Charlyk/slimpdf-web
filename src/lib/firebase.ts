'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0ftJB3x7w6NBG_DDfc2FZ4UGJxh7RsKU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "slimpdf-io.firebaseapp.com",
  projectId: "slimpdf-io",
  storageBucket: "slimpdf-io.firebasestorage.app",
  messagingSenderId: "930674939284",
  appId: "1:930674939284:web:71460f8988ab1670baab81",
  measurementId: "G-J5W3XS6FVL"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, googleProvider, githubProvider };
