import firebase from "firebase";

let config = {
    apiKey: process.env.API_KEY,
    authDomain: 'aidoruapi.firebaseapp.com',
    databaseURL: 'https://aidoruapi.firebaseio.com',
    projectId: 'aidoruapi',
    storageBucket: 'aidoruapi.appspot.com',
    messagingSenderId: '926155890436'
};

const FirebaseApp = firebase.initializeApp(config);
export default FirebaseApp;