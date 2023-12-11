/* eslint-disable no-undef */
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firebase-firestore"

const app = firebase.initializeApp({
  // eslint-disable-next-line no-undef
  apiKey: 'AIzaSyDkMUGaM2iVF1r3yY4c3wwvzjx3WXSJWn8',
  authDomain: 'wikiconnect-2803b.firebaseapp.com',
  projectId: 'wikiconnect-2803b',
  storageBucket: 'wikiconnect-2803b.firebaseapp.com',
  messagingSenderId: '876675350396',
  appId: '1:876675350396:web:54ac838c28ae99c407eef9'
})

export const firestore = app.firestore()
export const auth = app.auth()
export default app