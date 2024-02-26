const filter = document.getElementById("filter")
const articles = document.getElementById("articles-1")
const articles2 = document.getElementById("articles-2")
const articles3 = document.getElementById("articles-3")

const response = await fetch("../jsons/elements.json")
const elements = await response.json()
console.log(elements);

// const articleTemp = (equation, description, fact) => html`<article id="article">
//                             <h2>${equation}</h2>
//                             <ol>
//                                 <li>${description}</li>
//                                 <li>${fact}</li>
//                             </ol>
//                         </article>`

let count = 0
for (const reaction in elements) {
    count++
    
    const equation = reaction
    const description = elements[reaction].description
    const fact = elements[reaction]["interesting_fact"]
    const div = document.createElement("div")
    div.innerHTML = `<article id="article">
    <h2>${equation}</h2>
    <ul>
        <li>${description}</li>
        <li>${fact}</li>
    </ul>
</article>`
    if (count <= 5) {
        articles.appendChild(div)
    } else if (count > 5 && count <= 10) {
        articles2.appendChild(div)
    } else if (count > 10 && count <= 15) {
        articles3.appendChild(div)
    }
    
}

const one = document.getElementById("to-first")
one.onclick = () => {
    articles.style.display = 'flex'
    articles2.style.display = 'none'
    articles3.style.display = 'none'
}

const two = document.getElementById("to-second")
two.onclick = () => {
    articles.style.display = 'none'
    articles2.style.display = 'flex'
    articles3.style.display = 'none'
}

const three = document.getElementById("to-third")
three.onclick = () => {
    articles.style.display = 'none'
    articles2.style.display = 'none'
    articles3.style.display = 'flex'
}
