import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDM1kseGQ9VhZC93GR0eEGbyap9mt3wQJc",
    authDomain: "eventcrafter-82e46.firebaseapp.com",
    projectId: "eventcrafter-82e46",
    storageBucket: "eventcrafter-82e46.appspot.com",
    messagingSenderId: "881065657787",
    appId: "1:881065657787:web:44ec14805b98f7c66df09e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export { storage }