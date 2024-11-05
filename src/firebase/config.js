import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAfk95ABDQz4BTSZ6NiAVTKXqMOCBYb17Q",
    authDomain: "prog3rn-crespo.firebaseapp.com",
    projectId: "prog3rn-crespo",
    storageBucket: "prog3rn-crespo.appspot.com",
    messagingSenderId: "23180820788",
    appId: "1:23180820788:web:eb7f443e0c41b01dd82561"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
