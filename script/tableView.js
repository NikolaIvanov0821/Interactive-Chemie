import { html, render } from "lit-html";
import { request } from "../service/api.js";
import { click } from "./click.js";

const tableWrapper = document.getElementById("table-wrapper");
const table = document.getElementById("table");
const lanthanoids = document.getElementById("lanthanoids");
const acthanoids = document.getElementById("acthanoids");
const databaseUrl = "https://interactive-chemie-default-rtdb.europe-west1.firebasedatabase.app/";

const data = await request.get(databaseUrl + "elements.json");
const orderBg = await request.get(databaseUrl + "order-bg/order-bg.json");
const orderEn = await request.get(databaseUrl + "order-en/order.json");

const elementTemp = (element, bgName, id) => html`<div class="element" id=${id}>
        <div class="atomic-number">${element.number}</div>
        <div class="name">${element.name}</div>
        <div @click=${click} class="symbol">${element.symbol}</div>
        <div class="bg-name">${bgName}</div>
        <div class="atomic-mass">${element["atomic_mass"]}</div>
    </div>`;

const tableTemp = () => {
    let id = ""
    const elements = orderEn.map(element => {
        const bgName = orderBg[data[element].number - 1];

        if (data[element].number === 1 || (data[element].number >= 5 && data[element].number <= 8) || (data[element].number >= 14 && data[element].number <= 16) || data[element].number === 33 || data[element].number === 34 || data[element].number === 52) {
            id = "nonmetal"
        } else if (data[element].number === 2 || data[element].number === 10 || data[element].number === 18 || data[element].number === 36 || data[element].number === 54 || data[element].number === 86 || data[element].number === 118) {
            id = "noble-gas"
        } else if (data[element].number === 9 || data[element].number === 17 || data[element].number === 35 || data[element].number === 53 || data[element].number === 85 || data[element].number === 117) {
            id = "halogen"
        } else if (data[element].number === 3 || data[element].number === 11 || data[element].number === 19 || data[element].number === 37 || data[element].number === 55 || data[element].number === 87) {
            id = "alkali-metal"
        } else if (data[element].number === 4 || data[element].number === 12 || data[element].number === 20 || data[element].number === 38 || data[element].number === 56 || data[element].number === 88) {
            id = "alkaline-earth-metal"
        } else if ((data[element].number >= 21 && data[element].number <= 30) || (data[element].number >= 39 && data[element].number <= 48) || (data[element].number >= 72 && data[element].number <= 80) || (data[element].number >= 104 && data[element].number <= 112)) {
            id = "transition-metal"
        } else if (data[element].number >= 57 && data[element].number <= 71) {
            id = "lanthanoid"
        } else if (data[element].number >= 89 && data[element].number <= 103) {
            id = "acthanoid"
        } else {
            id = "post-transition-metal"
        }

        return elementTemp(data[element], bgName, id);
    });

    render(html`${elements}`, table);
};

tableTemp();

