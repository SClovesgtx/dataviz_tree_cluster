// function nestdivstItems(divElement, items, className) {
//     divElement.setAttribute("class", className)
//     for 
//     if (!items.?buckets){
//         return divElement
//     }
// }


fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const rootElement = document.querySelector('#root')
        const cadeias = data["cadeias"]["buckets"]
        const firstDiv = document.createElement("div")
        firstDiv.setAttribute("id", "cadeias")
        for (let cadeia of cadeias) {
            let divCadeia = document.createElement("div")
            divCadeia.setAttribute("id", cadeia["key"])
            divCadeia.setAttribute("class", "cadeia")
            divCadeia.innerHTML = `<div class="cadeiaName">${cadeia["key"]}</div>`
            let temas = cadeia["temas"]["buckets"]
            let divTemas = document.createElement("div")
            divTemas.setAttribute("class", "temas")
            for (let tema of temas){
                let divTema = document.createElement("div")
                divTema.setAttribute("id", tema["key"])
                divTema.setAttribute("class", "tema")
                divTema.innerHTML = `<div class="temaName">${tema["key"]}</div>`
                let subtemas = tema?.subtemas?.buckets
                if (subtemas) {
                    let divSubtemas = document.createElement("div")
                    divSubtemas.setAttribute("class", "subtemas")
                    for (let subtema of subtemas) {
                        let divSubtema = document.createElement("div")
                        divSubtema.setAttribute("id", subtema["key"])
                        divSubtema.setAttribute("class", "subtema")
                        divSubtema.innerHTML = subtema["key"]
                        divSubtemas.appendChild(divSubtema)
                    }
                    divTema.appendChild(divSubtemas)
                }
                divCadeia.appendChild(divTema)
            }
            firstDiv.appendChild(divCadeia)
        };

        rootElement.appendChild(firstDiv)
    });