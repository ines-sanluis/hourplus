import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { dateFormatter, msToString } from "../utils/time"
import { WORK_STATUS } from "../utils/constants"

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

export const logOut = () => {
  return firebase.auth().signOut()
}

export const addEntry = (result) => {
  return db.collection("entries").add(result)
}

export const fetchUserEntries = (userId) => {
  let total = 0
  return db
    .collection("entries")
    .where("userId", "==", userId)
    .orderBy("worked.start", "desc")
    .get()
    .then((snapshot) => {
      const results = snapshot.docs.map((doc) => {
        const data = doc.data()
        const options = {
          timeStyle: "short", // or 'medium', 'long', or 'full'
        }
        const formatter = new Intl.DateTimeFormat("es-ES", options)
        let status = WORK_STATUS.WORKING
        let result = 0
        if (data.isFreeDay) {
          status = WORK_STATUS.FREE_DAY
          result = data.compensated.total
        } else if (data.overworked.total > 0) {
          status = WORK_STATUS.OVERWORKED
          result = data.overworked.total
        } else if (data.overworked.total <= 0) {
          status = WORK_STATUS.UNDERWORKED
          result = data.underworked.total
        }
        if (status === WORK_STATUS.OVERWORKED || status === WORK_STATUS.FREE_DAY) {
          total += result
        }
        else if (status === WORK_STATUS.UNDERWORKED) {
          total -= result
        }
        return {
          id: doc.id,
          date: dateFormatter.format(new Date(data.worked.start)),
          start: formatter.format(new Date(data.worked.start)),
          end: formatter.format(new Date(data.worked.end)),
          total:  msToString(data.worked.total),
          shiftDuration: msToString(data.worked.shiftDuration),
          break: msToString(data.worked.break),
          result: msToString(result),
          status,
        }
      })
      return  { entries: results, total }
    })
}

export const deleteEntry = (id) => {
  return db.collection("entries").doc(id).delete()
}

export const deleteAllEntries = (userId) => {
  return db
    .collection("entries")
    .where("userId", "==", userId)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
}