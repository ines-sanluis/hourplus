import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBY9N4PCPmccZ0tWNQMZkJaMeaGcKqHT6k",
  authDomain: "contahoras-1ed35.firebaseapp.com",
  projectId: "contahoras-1ed35",
  storageBucket: "contahoras-1ed35.appspot.com",
  messagingSenderId: "499669748656",
  appId: "1:499669748656:web:b646cb5fce3eb535fc2475",
  measurementId: "G-806QD95QPC",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const mapUserFromFirebaseToUser = (user) => {
  return {
    name: user.displayName,
    avatar: user.photoURL,
    id: user.uid,
    email: user.email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

export const addEntry = (result) => {
  return db.collection("entries").add(result)
}
