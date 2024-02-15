const root = document.getElementById("choose-elements")


const response = await fetch("../jsons/elements.json")
const elements = await response.json()

for (const element in elements.elements) {
    const symbol = elements.elements[element].symbol
    const type = elements.elements[element].type
    const elBtn = document.createElement("button")
    elBtn.textContent = symbol
    elBtn.className = type
    root.appendChild(elBtn)

    elBtn.onclick = click({element, symbol, type})
}

function click(info) {
    
}
function reaction(type) {
    switch (type) {
        case value:
            
            break;
    
        default:
            break;
    }
}