import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3ihLym-FfIRredRxkLj3ZUiJxpxEZQGk",
    authDomain: "test-auth-intrchem.firebaseapp.com",
    projectId: "test-auth-intrchem",
    storageBucket: "test-auth-intrchem.appspot.com",
    messagingSenderId: "761915305277",
    appId: "1:761915305277:web:7d79d8daac6a42c77b2954",
    measurementId: "G-S7W35233WW"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const database = getDatabase(app)
const email = document.getElementById("email").value
const password = document.getElementById("password").value
const form = document.querySelector("form")

form.onsubmit = submit

function submit(e) {
  e.preventDefault()

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
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
        uid: uid,
        tokens
    }
    writeNewPost(uid, userInfo)
    sessionStorage.setItem("user", userInfo)
    window.location.href = "../static/table.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
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
    const rootRef = ref(database, "login/" + uid);
    const newChildRef = push(rootRef);

    return set(newChildRef, user);
  }
// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("loginForm");
//     const loginButton = document.getElementById("loginButton");
//     const registerForm = document.getElementById("registrationForm");
//     const registerButton = document.getElementById("registerButton");
//     const message = document.getElementById("message");
//     const gotoRegisterButton = document.getElementById("gotoRegister");
//     const gotoLoginButton = document.getElementById("gotoLogin");

//     loginButton.addEventListener("click", function () {
//         const username = document.getElementById("loginUsername").value;
//         const password = document.getElementById("loginPassword").value;
        
        

//         if (user) {
//             message.textContent = "Login successful";
//             message.style.color = "green";
//         } else {
//             message.textContent = "Login failed. Please check your credentials.";
//             message.style.color = "red";
//         }
//     });

//     registerButton.addEventListener("click", function () {
//         const username = document.getElementById("registerUsername").value;
//         const password = document.getElementById("registerPassword").value;

//         if (username && password) {
//             users.push({ username, password });
//             message.textContent = "Registration successful";
//             message.style.color = "green";
//         } else {
//             message.textContent = "Please fill out both fields to register.";
//             message.style.color = "red";
//         }
//     });

//     gotoRegisterButton.addEventListener("click", function () {
//         loginForm.classList.add("hidden");
//         registerForm.classList.remove("hidden");
//     });

//     gotoLoginButton.addEventListener("click", function () {
//         registerForm.classList.add("hidden");
//         loginForm.classList.remove("hidden");
//     });
// });