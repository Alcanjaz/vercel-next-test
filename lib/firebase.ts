/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBtNX7rvGE7LE2j3yQoHWZ1cNITiDXhLFg',
  authDomain: 'firenext-8d6f0.firebaseapp.com',
  projectId: 'firenext-8d6f0',
  storageBucket: 'firenext-8d6f0.appspot.com',
  messagingSenderId: '823337488947',
  appId: '1:823337488947:web:aa61465a03c3389d478946',
  measurementId: 'G-5XT5TCR9LH',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const { STATE_CHANGED } = firebase.storage.TaskEvent;
export const { fromMillis } = firebase.firestore.Timestamp;
export const { serverTimestamp } = firebase.firestore.FieldValue;

/** `
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/** `
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
