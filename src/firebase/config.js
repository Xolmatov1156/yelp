import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASq7u14FWCTFkbCyCdi17OyGF1B9vuFLo",
  authDomain: "my-yelp-917f8.firebaseapp.com",
  projectId: "my-yelp-917f8",
  storageBucket: "my-yelp-917f8.appspot.com",
  messagingSenderId: "60228996806",
  appId: "1:60228996806:web:979d90e485fe69bc7c91c7",
  measurementId: "G-WMRNKNNXRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
