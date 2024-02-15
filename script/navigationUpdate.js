const nav = document.querySelector("nav");
const user = sessionStorage.getItem("user")

const guestTemplate = `<a href="../static/table.html">ТАБЛИЦА</a>
                    <a href="../static/reactions.html">РЕАКЦИИ</a>
                    <a href="../static/about.html">ЗА ПРОЕКТА</a>
                    <a href="../static/login.html">ВХОД</a>
                    <a href="../static/register.html">РЕГИСТРАЦИЯ</a>`

const userTemplate = `<a href="../static/table.html">ТАБЛИЦА</a>
                    <a href="../static/reactions.html">РЕАКЦИИ</a>
                    <a href="../static/about.html">ЗА ПРОЕКТА</a>
                    <button id="logout">ИЗХОД</button>`

if (user && user !== undefined) {
    nav.innerHTML = userTemplate
} else {
    nav.innerHTML = guestTemplate
}