import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBl3ucs5y9V7UQvFRC623o7aR_TFHTb6f8",
  authDomain: "bloc-chat-ec971.firebaseapp.com",
  databaseURL: "https://bloc-chat-ec971.firebaseio.com",
  projectId: "bloc-chat-ec971",
  storageBucket: "bloc-chat-ec971.appspot.com",
  messagingSenderId: "698791447804"
};
firebase.initializeApp(firebaseConfig);

export const roomsRef = firebase.database().ref("rooms");
export const messagesRef = firebase.database().ref("messages");
export const firebaseAuth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
