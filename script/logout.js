import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, child, push, update, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const auth = getAuth(initializeApp);

const logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener("click", logout)

function logout() {
    
    signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });

}