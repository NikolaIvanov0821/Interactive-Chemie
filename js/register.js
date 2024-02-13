// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, child, push, update, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
//import { request } from "../service/api.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3ihLym-FfIRredRxkLj3ZUiJxpxEZQGk",
    authDomain: "test-auth-intrchem.firebaseapp.com",
    projectId: "test-auth-intrchem",
    storageBucket: "test-auth-intrchem.appspot.com",
    messagingSenderId: "761915305277",
    appId: "1:761915305277:web:7d79d8daac6a42c77b2954",
    measurementId: "G-S7W35233WW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const form = document.querySelector("form")

form.onsubmit = submit

console.log(database);
function submit(e) {
    e.preventDefault();
    console.log(e.target);
    
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repassword = document.getElementById("repassword").value

    signup(username, email, password, repassword)
}

function signup(username, email, password, repassword) {
    let isOk = true

    if (repassword !== password) {
        isOk = false
        alert("Паролите не съвпадат. Опитай пак!")
    }

    if (isOk) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid
                const userInfo = {
                    accessToken: user.accessToken,
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified : user.emailVerified,
                    isAnonymous : user.isAnonymous,
                    phoneNumber: user.phoneNumber,
                    photoUrl: user.photoURL,
                    providerId: user.providerId,
                    stsTokenManager: user.stsTokenManager,
                    uid: uid
                }
                writeNewPost(uid, userInfo)
                //sessionStorage.setItem("accessToken", user.accessToken)
                //request.post(firebaseConfig.databaseURL + "/register/" + uid, user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });    
    }
}
function writeNewPost(uid, user) {
  
    // A post entry.
    // const postData = {
    //   username: username,
    //   uid: uid,
    //   email: email,
    //   password: password,
    //   starCount: 0,
    //   authorPic: picture
    // };
  
    // Get a key for a new Post.
    // const newPostKey = push(child(ref(db), 'posts')).key;
  
    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // const updates = {};
    // updates['/register/' + uid + '/' + newPostKey] = user;
    // //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    const rootRef = ref(database, "register/" + uid);
    const newChildRef = push(rootRef);

    return set(newChildRef, user);
  }