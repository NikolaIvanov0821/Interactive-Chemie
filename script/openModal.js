import { request } from "../service/api.js";

const asideRef = document.getElementById("element-info")

//Деклариране на база данни и подаване на заявки за информация за елементите 
const databaseUrl = "https://interactive-chemie-default-rtdb.europe-west1.firebasedatabase.app/";
const jsonData = await request.get(databaseUrl + "elements.json");
const orderBg = await request.get(databaseUrl + "order-bg/order-bg.json");
const orderEn = await request.get(databaseUrl + "order-en/order.json");

//Създаване на изкачащ прозорец съдържащ информация за избран елемент
export function click(e) {
    const index = e.target.parentElement.querySelector(".atomic-number")
    console.log(index);

    const element = orderEn[index.textContent - 1]
    const elementsInfo = jsonData[element].info

    asideRef.innerHTML = `<div id="popup-box" class="modal">
                                    <div class="content">
                                        <section id="top">
                                            <section id="summary">
                                                <h1 id="name">
                                                    ${orderBg[index.textContent - 1]}
                                                </h1>
                                            
                                                <p>
                                                    ${elementsInfo.summary}
                                                </p>
                                            </section>
                                            <img src="../images/${orderBg[index.textContent - 1]}.jpg" alt="" >
                                        </section>
                                        

                                        <h2>История</h2>
                                        <p>
                                            ${elementsInfo.history}
                                        </p>

                                        <h2>Физични свойства</h2>
                                        <p>
                                            ${elementsInfo["physiscal-properties"]}
                                        </p>

                                        <h2>Химични свойства</h2>
                                        <p>
                                            ${elementsInfo["chemical-properties"]}
                                        </p>

                                        <h2>Изотопи</h2>
                                        <p>
                                            ${elementsInfo.isotopes}
                                        </p>

                                        <h2>Производство</h2>
                                        <p>
                                            ${elementsInfo.production}
                                        </p>

                                        <h2>Приложение</h2>
                                        <p>
                                            ${elementsInfo.usage}
                                        </p>
                                        <button href="#" class="box-close">
                                            x
                                        </button>
                                    </div>
                                </div>`
    const myPopUp = document.getElementById("popup-box")
    myPopUp.style.display = "flex"
    console.log(index.parentElement)
    myPopUp.style.backgroundColor = index.parentElement.style.backgroundColor
    document.querySelector(".box-close").onclick = closeBox
    function closeBox() {
        document.getElementById("popup-box").style.display = "none"
    }
}
