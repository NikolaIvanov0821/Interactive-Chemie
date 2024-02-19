import { request } from "../service/api.js";
import { click } from "./openModal.js";

//Деклариране на URL на базата данни
const databaseUrl = "https://interactive-chemie-default-rtdb.europe-west1.firebasedatabase.app/";

//Извличне на данни за елементите от базата данни
const jsonData = await request.get(databaseUrl + "elements.json");
const orderBg = await request.get(databaseUrl + "order-bg/order-bg.json");
const orderEn = await request.get(databaseUrl + "order-en/order.json");

//Деклариране на section-ни в които се добавят елементите
const direction = document.getElementById("table");
const lanthanoids = document.getElementById("lanthanoids")
const acthanoids = document.getElementById("acthanoids")

//Функиця за създаване на div съдържащ информация за елемента
orderEn.map(element => {
    const index = jsonData[element].number - 1;
    
    //Създаване на div за елемента
    const newDiv = document.createElement("div");
    newDiv.className = "element";

    //Деклариранена атомния номер на елемента
    const atomicNumber = document.createElement("div")
    atomicNumber.textContent = `${jsonData[element].number}`;
    atomicNumber.className = "atomic-number";

    //Деклариране на английското наименивание на елемента
    const elementName = document.createElement("div");
    elementName.textContent = `${jsonData[element].name}`;
    elementName.className = "name";

    //Деклариране на химичния знак на елемента
    const symbol = document.createElement("div");
    symbol.textContent = `${jsonData[element].symbol}`;
    symbol.className = "symbol";
    symbol.onclick = click;

    //Деклариране на българското наименование на елемента
    const bgName = document.createElement("div");
    bgName.textContent = orderBg[jsonData[element].number - 1];
    bgName.className = "bg-name";

    //Деклариране на атомната маса на елемента
    const mass = document.createElement("div");
    mass.textContent = `${Number(jsonData[element]['atomic_mass']).toFixed(3)}`;
    mass.className = "atomic-mass";

    //Добавяне на отделните компоненти към елемента
    newDiv.appendChild(atomicNumber)
    newDiv.appendChild(elementName)
    newDiv.appendChild(symbol)
    newDiv.appendChild(bgName)
    newDiv.appendChild(mass)

    //Добавяне на елемента към section спрямо атомия му номер
    if (index >= 56 && index <= 70) {
        lanthanoids.appendChild(newDiv)
    } else if (index >= 88 && index <= 102) {
        acthanoids.appendChild(newDiv)
    } else {
        direction.appendChild(newDiv)
    }
    
    //Подреждане на елементите в основния section
    function elememntOrder() {
        if (index === 0) {
            for (let i = 0; i < 16; i++) {
                const emptyDiv = document.createElement('div')
                direction.appendChild(emptyDiv)
            }
        }
        if (index === 3 || index === 11) {
            for (let i = 0; i < 10; i++) {
                const emptyDiv = document.createElement('div')
                direction.appendChild(emptyDiv)
            }
        }
        if (index === 55) {
            const emptyDiv = document.createElement('div')
            direction.appendChild(emptyDiv)

        }
        if (index === 87) {
            const emptyDiv = document.createElement('div')
            direction.appendChild(emptyDiv)

        }
    }
    elememntOrder()

    //Задаване на id на елемента спрямо типа му
    function setingID() {
        if (jsonData[element].number === 1 || (jsonData[element].number >= 5 && jsonData[element].number <= 8) || (jsonData[element].number >= 14 && jsonData[element].number <= 16) || jsonData[element].number === 33 || jsonData[element].number === 34 || jsonData[element].number === 52) {
            newDiv.id = "nonmetal"
        } else if (jsonData[element].number === 2 || jsonData[element].number === 10 || jsonData[element].number === 18 || jsonData[element].number === 36 || jsonData[element].number === 54 || jsonData[element].number === 86 || jsonData[element].number === 118) {
            newDiv.id = "noble-gas"
        } else if (jsonData[element].number === 9 || jsonData[element].number === 17 || jsonData[element].number === 35 || jsonData[element].number === 53 || jsonData[element].number === 85 || jsonData[element].number === 117) {
            newDiv.id = "halogen"
        } else if (jsonData[element].number === 3 || jsonData[element].number === 11 || jsonData[element].number === 19 || jsonData[element].number === 37 || jsonData[element].number === 55 || jsonData[element].number === 87) {
            newDiv.id = "alkali-metal"
        } else if (jsonData[element].number === 4 || jsonData[element].number === 12 || jsonData[element].number === 20 || jsonData[element].number === 38 || jsonData[element].number === 56 || jsonData[element].number === 88) {
            newDiv.id = "alkaline-earth-metal"
        } else if ((jsonData[element].number >= 21 && jsonData[element].number <= 30) || (jsonData[element].number >= 39 && jsonData[element].number <= 48) || (jsonData[element].number >= 72 && jsonData[element].number <= 80) || (jsonData[element].number >= 104 && jsonData[element].number <= 112)) {
            newDiv.id = "transition-metal"
        } else if (jsonData[element].number >= 57 && jsonData[element].number <= 71) {
            newDiv.id = "lanthanoid"
        } else if (jsonData[element].number >= 89 && jsonData[element].number <= 103) {
            newDiv.id = "acthanoid"
        } else {
            newDiv.id = "post-transition-metal"
        }
    }
    setingID()
});
