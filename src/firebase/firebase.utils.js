import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBF4FWr6_czYkWBe_t4TlcbzI45LM6Ve0U",
  authDomain: "e-commerce-382e8.firebaseapp.com",
  databaseURL: "https://e-commerce-382e8.firebaseio.com",
  projectId: "e-commerce-382e8",
  storageBucket: "e-commerce-382e8.appspot.com",
  messagingSenderId: "66688567980",
  appId: "1:66688567980:web:d585ba19c08fc6bcc4ed09",
  measurementId: "G-2PRC8C5KNE",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
