import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, child, push, update, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"; 
import { updatenav } from "./navigationUpdate.js";

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

//Създаване на функция за изход от профила на потребителя
const logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener("click", logout)

function logout() {
    
    signOut(auth).then(() => {
        // Sign-out successful.
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("uid")
        updatenav()
        }).catch((error) => {
        // An error happened.
        });

}