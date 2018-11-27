import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBatIo4-BySiVm56oPjzbVPDyUTuYO4sGQ',
  authDomain: 'react-ts-c7d1a.firebaseapp.com',
  databaseURL: 'https://react-ts-c7d1a.firebaseio.com',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

// references to out children in our database
export const headToHeadsRef = ref.child('headToHeads');
export const playersRef = ref.child('players');
// export const gamesRef = ref.child('games');

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function off() {
  return ref.off();
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => user);
}
