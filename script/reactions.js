const filter = document.getElementById("filter")
const articles = document.getElementById("articles")

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
    //render(articleTemp(equation, description, fact), articles)
    const div = document.createElement("div")
    div.innerHTML = `<article id="article">
    <h2>${equation}</h2>
    <ol>
        <li>${description}</li>
        <li>${fact}</li>
    </ol>
</article>`
    articles.appendChild(div)
}

