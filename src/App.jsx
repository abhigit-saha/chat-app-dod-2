import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import Search from "./components/Search";
import Chats from "./components/Chats";
import Chat from "./components/Chat";
import Input from "./components/Input";
import Messages from "./components/Messages";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";

//initializing app in firebase
firebase.initializeApp({
  apiKey: "AIzaSyDibgTP1huXJjPdDzf_8E50urHvNLvHEUI",

  authDomain: "chat-app-3234c.firebaseapp.com",

  projectId: "chat-app-3234c",

  storageBucket: "chat-app-3234c.appspot.com",

  messagingSenderId: "275593356816",

  appId: "1:275593356816:web:54fa6a69723d7f9b5c0c95",
});

export const db = getFirestore();

export const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  //if the user is logged in then user is not null, else user is null.
  return (
    <div className="App">
      <header>
        <SignOut />
        {user && <Navbar />}
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = async () => {
    //signing in using google
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    // Check if the user is signing in for the first time
    const userRef = firestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      // If the user is signing in for the first time, add their information to the "users" collection
      await userRef.set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
      });
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  return (
    <>
      <Search />
      <Chats />
      <Chat />
      <Messages />
      <Input />
    </>
  );
}
export default App;
