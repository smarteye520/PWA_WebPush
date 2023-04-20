import firebase from 'firebase';
import 'firebase/messaging';
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB9aW52SI5p_eZ5k_uolO5YdQrjHC2qOPM",
  authDomain: "postgame-59af1.firebaseapp.com",
  projectId: "postgame-59af1",
  storageBucket: "postgame-59af1.appspot.com",
  messagingSenderId: "899146338921",
  appId: "1:899146338921:web:04a26cb3e91e05cd2e88f8",
  measurementId: "G-Q80RJ9LGPN"
};

export const initializeFirebase = () => {
  // Firebase SDK V8
  firebase.initializeApp(firebaseConfig)

  // Firebase SDK V9
  // initializeApp(firebaseConfig);
}

export const requestPermission = async () => {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  })
}

export const askingToken = async () => {
  try {
    // Firebase SDK V8    
    const messaging = firebase.messaging();
    // const token = await messaging.getToken();
       
    messaging.getToken({ vapidKey: 'BL3eTMUOgXlV5Pud4F_iDFFsOwAKXR-6eMQu7JLRkfdTYwkIJdQkrBvnqjGqiWMOJNamSOUqgslkH4L1N_0LuAM' }).then((currentToken) => {
      if (currentToken) {
        
        console.log('Your push token is:', currentToken);
        // Send the token to your server and update the UI if necessary
        // *****************************************************
        // *****************************************************
        // *****************************************************
        // *****************************************************
        // *****************************************************

      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

    // Firebase SDK V9
    // const app = initializeApp(firebaseConfig);
    // const messaging = getMessaging(app)
    // const messaging = getMessaging();

    // getToken(messaging, { vapidKey: 'BL3eTMUOgXlV5Pud4F_iDFFsOwAKXR-6eMQu7JLRkfdTYwkIJdQkrBvnqjGqiWMOJNamSOUqgslkH4L1N_0LuAM' }).then((currentToken) => {
    //   if (currentToken) {
    //     console.log('Your token is:', currentToken);
    //     // Send the token to your server and update the UI if necessary
    //     // ...
    //   } else {
    //     // Show permission request UI
    //     console.log('No registration token available. Request permission to generate one.');
    //     // ...
    //   }
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    //   // ...
    // });
  } catch (error) {
    console.error(error);
  }
}

export const receiveNotificationInForeground = async () => {
  const messaging = firebase.messaging();
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload.notification);
    alert(payload.notification.body)
  });
}
  