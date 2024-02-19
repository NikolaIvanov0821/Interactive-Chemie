// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, child, push, update, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

//Информация за базата данни
const firebaseConfig = {
    apiKey: "AIzaSyC3ihLym-FfIRredRxkLj3ZUiJxpxEZQGk",
    authDomain: "test-auth-intrchem.firebaseapp.com",
    projectId: "test-auth-intrchem",
    storageBucket: "test-auth-intrchem.appspot.com",
    messagingSenderId: "761915305277",
    appId: "1:761915305277:web:7d79d8daac6a42c77b2954",
    measurementId: "G-S7W35233WW"
  };

//Деклариране на базата данни и нейни компоненти
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

//Създаване на функция за подаване на формуляра за регистрация
const form = document.querySelector("form")
form.onsubmit = submit

function submit(e) {
    e.preventDefault();
    console.log(e.target);
    
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repassword = document.getElementById("repassword").value

    signup(username, email, password, repassword)
}

//Функция за регистриране на потребителя
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
                sessionStorage.setItem("user", userInfo)                
                window.location.href = "../static/table.html"
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });    
    }
}
async function writeNewPost(uid, user) {
    const rootRef = ref(database, "register/" + uid);
    const newChildRef = push(rootRef);

    return await set(newChildRef, user);
}