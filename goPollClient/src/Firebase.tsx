// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {useNavigate} from 'react-router-dom'
// import {useState, useEffect} from 'react'

import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)

// const provider = new GoogleAuthProvider()

// export const signInWithGoogle = () => {
//     signInWithPopup(auth, provider).then((result) => {
        // const name = result.user.displayName
        // const email = result.user.email

//         if (name) {
//             localStorage.setItem("name", name)
//         }
//         if (email) {
//             localStorage.setItem("email", email)
//         

//         const history = useNavigate()
//         history('/poll')
        
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
// }

// export const signIn = (email:string, password:string) => {
//     signInWithEmailAndPassword(auth, email, password)
//     .then((result:any) => {
//         const name = result.user.displayName
//         const email = result.user.email

//         if (name) {
//             localStorage.setItem("name", name)
//         }
//         if (email) {
//             localStorage.setItem("email", email)
//         }
        
//         const history = useNavigate()
//         history('/poll')

//         console.log(result)
//     })
//     .catch((error:any) => {
//         console.log(error)
//         return false
//     })
// }

// export const createUser = (email:string, password:string) => {
//     createUserWithEmailAndPassword(auth, email, password)
//     // .then((result:any) =>{
//     //     const name = result.user.displayName
//     //     const email = result.user.email

//     //     if (name) {
//     //         localStorage.setItem("name", name)
//     //     }
//     //     if (email) {
//     //         localStorage.setItem("email", email)
//     //     }
        
//     //     const history = useNavigate()
//     //     history('/poll')
//     //     console.log(result)

//     // })
//     // .catch((error) => {
//     //     return console.log(error)
//     // })
// }

// export const logOut = () => {
//     signOut(auth).then(() => {
//         return true
//     })
//     .catch((error) => {
//         return false
//     })
// }

// // export function useAuth() {
// //     const [currentUser, setCurrentUser] = useState();

// //     useEffect(() => {
// //         const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
// //     },[])

// //     return currentUser;
// // }

