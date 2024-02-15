import { request } from "../service/api.js";
import { click } from "./openModal.js";

const databaseUrl = "https://interactive-chemie-default-rtdb.europe-west1.firebasedatabase.app/";

const jsonData = await request.get(databaseUrl + "elements.json");
const orderBg = await request.get(databaseUrl + "order-bg/order-bg.json");
const orderEn = await request.get(databaseUrl + "order-en/order.json");


orderEn.map(element => {
    const index = jsonData[element].number - 1;

    let direction = document.getElementById("table");
    let newDiv = document.createElement("div");
    newDiv.className = "element";

    let atomicNumber = document.createElement("div")
    atomicNumber.textContent = `${jsonData[element].number}`;
    atomicNumber.className = "atomic-number";

    let elementName = document.createElement("div");
    elementName.textContent = `${jsonData[element].name}`;
    elementName.className = "name";

    let symbol = document.createElement("div");
    symbol.textContent = `${jsonData[element].symbol}`;
    symbol.className = "symbol";
    symbol.onclick = click;

    let bgName = document.createElement("div");
    bgName.textContent = orderBg[jsonData[element].number - 1];
    bgName.className = "bg-name";


    let mass = document.createElement("div");
    mass.textContent = `${Number(jsonData[element]['atomic_mass']).toFixed(3)}`;
    mass.className = "atomic-mass";

    newDiv.appendChild(atomicNumber)
    newDiv.appendChild(elementName)
    newDiv.appendChild(symbol)
    newDiv.appendChild(bgName)
    newDiv.appendChild(mass)

    let lanthanoids = document.getElementById("lanthanoids")
    let acthanoids = document.getElementById("acthanoids")

    if (index >= 56 && index <= 70) {
        lanthanoids.appendChild(newDiv)
    } else if (index >= 88 && index <= 102) {
        acthanoids.appendChild(newDiv)
    } else {
        direction.appendChild(newDiv)
    }

    function elememntOrder() {
        if (index === 0) {
            for (let i = 0; i < 16; i++) {
                let emptyDiv = document.createElement('div')
                direction.appendChild(emptyDiv)
            }
        }
        if (index === 3 || index === 11) {
            for (let i = 0; i < 10; i++) {
                let emptyDiv = document.createElement('div')
                direction.appendChild(emptyDiv)
            }
        }
        if (index === 55) {
            let emptyDiv = document.createElement('div')
            direction.appendChild(emptyDiv)

        }
        if (index === 87) {
            let emptyDiv = document.createElement('div')
            direction.appendChild(emptyDiv)

        }
    }
    elememntOrder()

    function setingClass() {
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
    setingClass()
});



