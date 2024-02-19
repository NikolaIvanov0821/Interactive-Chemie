import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const database = getDatabase(app)

//Създаване на функция за подаване на формуляра за вход
const form = document.querySelector("form")
form.onsubmit = submit

function submit(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    signin(email, password)
}

//Функция за влизане в профил на потребителя
function signin(email, password) {
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
              uid: uid
          }
          writeNewPost(uid, userInfo)
          sessionStorage.setItem("user", userInfo)

          window.location.href = "../static/table.html"
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
      });
}

//Записване на влезлия потребител в базата данни
async function writeNewPost(uid, user) {
    const rootRef = ref(database, "login/" + uid);
    const newChildRef = push(rootRef);

    return await set(newChildRef, user);
}

