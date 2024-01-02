document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
    const registerForm = document.getElementById("registrationForm");
    const registerButton = document.getElementById("registerButton");
    const message = document.getElementById("message");
    const gotoRegisterButton = document.getElementById("gotoRegister");
    const gotoLoginButton = document.getElementById("gotoLogin");

    loginButton.addEventListener("click", function () {
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        
        

        if (user) {
            message.textContent = "Login successful";
            message.style.color = "green";
        } else {
            message.textContent = "Login failed. Please check your credentials.";
            message.style.color = "red";
        }
    });

    registerButton.addEventListener("click", function () {
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;

        if (username && password) {
            users.push({ username, password });
            message.textContent = "Registration successful";
            message.style.color = "green";
        } else {
            message.textContent = "Please fill out both fields to register.";
            message.style.color = "red";
        }
    });

    gotoRegisterButton.addEventListener("click", function () {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    gotoLoginButton.addEventListener("click", function () {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });
});