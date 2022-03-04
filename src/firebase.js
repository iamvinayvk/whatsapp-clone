import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC8Bjl9RA4mGFbJq49613tM-3r2QWmhQNo",
  authDomain: "whatsapp-mern-2fef1.firebaseapp.com",
  projectId: "whatsapp-mern-2fef1",
  storageBucket: "whatsapp-mern-2fef1.appspot.com",
  messagingSenderId: "614791194969",
  appId: "1:614791194969:web:0512146f4a6ac348afc448",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
