// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCl6aoxTDAFgN9CaxI580eX-l6rvLhZqqo",
//   authDomain: "sahil-projects-74acd.firebaseapp.com",
//   databaseURL: "https://sahil-projects-74acd.firebaseio.com",
//   projectId: "sahil-projects-74acd",
//   storageBucket: "sahil-projects-74acd.appspot.com",
//   messagingSenderId: "761246781455",
//   appId: "1:761246781455:web:c7d0f2109d883a5acad37a",
//   measurementId: "G-QKTJQSVXBP",
// };
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCl6aoxTDAFgN9CaxI580eX-l6rvLhZqqo",
  authDomain: "sahil-projects-74acd.firebaseapp.com",
  databaseURL: "https://sahil-projects-74acd.firebaseio.com",
  projectId: "sahil-projects-74acd",
  storageBucket: "sahil-projects-74acd.appspot.com",
  messagingSenderId: "761246781455",
  appId: "1:761246781455:web:c7d0f2109d883a5acad37a",
  measurementId: "G-QKTJQSVXBP",
});

const db = firebaseApp.firestore();

export default db;
