import { html, render } from "./node_modules/lit-html/lit-html.js";
import { request } from "./service/api.js";

const main = document.querySelector("main")
const dbRef = "https://interactive-chemie-default-rtdb.europe-west1.firebasedatabase.app/elements/"
const summaryRef = "/info/summary.json"
const historyRef = "/info/history.json"
const physicalRef = "/info/physical-properies.json"
const chemicalRef = "/info/chemical-properies.json"
const isotopesRef = "/info/isotopes.json"
const productionRef = "/info/production.json"
const usageRef = "/info/usage.json"

const formTemp = () => html`<form @submit=${submit}>

        <h3>Name</h3>
        <label for="name">Name:</label>
        <input id="name" name="name">

        <h3>Summary</h3>
        <label for="summary">Brief Introduction:</label>
        <input id="summary" name="summary">

        <h3>History</h3>
        <label for="history">History:</label>
        <input id="history" name="history">

        <h3>Chemical Properties</h3>
        <label for="chemical">Chemical</label>
        <input id="chemical" name="chemical">

        <h3>Physical Properties</h3>
        <label for="physical">Physical:</label>
        <input id="physical" name="physical" >

        <h3>Isotopes</h3>
        <label for="isotopes">Isotopes:</label>
        <input id="isotopes" name="isotopes">

        <h3>Production</h3>
        <label for="production">Production</label>
        <input id="production" name="production">
        
        <h3>Usage</h3>
        <label for="usage">Usage</label>
        <input id="usage" name="usage">

        <button type="submit">Submit</button>

</form>
`

async function submit(e) {
    e.preventDefault()

    const formData = new FormData(e.target);
    const { name, summary, history, chemical, physical, isotopes, production, usage } = Object.fromEntries(formData); // Convert FormData to an object

    console.log("Request Payload:", JSON.stringify(summary));
    await request.post(dbRef + name + summaryRef, JSON.stringify(summary))
    console.log("Request Payload:", JSON.stringify(history));
    await request.post(dbRef + name + historyRef, JSON.stringify(history))
    console.log("Request Payload:", JSON.stringify(physical));
    await request.post(dbRef + name + physicalRef, JSON.stringify(physical))
    console.log("Request Payload:", JSON.stringify(chemical));
    await request.post(dbRef + name + chemicalRef, JSON.stringify(chemical))
    console.log("Request Payload:", JSON.stringify(isotopes));
    await request.post(dbRef + name + isotopesRef, JSON.stringify(isotopes))
    console.log("Request Payload:", JSON.stringify(production));
    await request.post(dbRef + name + productionRef, JSON.stringify(production))
    console.log("Request Payload:", JSON.stringify(usage));
    await request.post(dbRef + name + usageRef, JSON.stringify(usage))

}
render(formTemp(), main)