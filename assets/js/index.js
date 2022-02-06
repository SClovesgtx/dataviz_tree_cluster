// function nestListItems(ulElement, items, className) {
//     ulElement.setAttribute("class", className)
//     for 
//     if (!items.?buckets){
//         return ulElement
//     }
// }


fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const rootElement = document.querySelector('#root')
        const cadeias = data["cadeias"]["buckets"]
        const firstUl = document.createElement("ul")
        firstUl.setAttribute("class", "cadeia")
        for (let cadeia of cadeias) {
            let li = document.createElement("li")
            li.setAttribute("id", cadeia["key"])
            li.innerHTML = cadeia["key"]
            firstUl.appendChild(li)
            let temas = cadeia["temas"]["buckets"]
            let ulTemas = document.createElement("ul")
            ulTemas.setAttribute("class", "tema")
            for (let tema of temas){
                let liTema = document.createElement("li")
                liTema.setAttribute("id", tema["key"])
                liTema.innerHTML = tema["key"]
                let subtemas = tema?.subtemas?.buckets
                if (subtemas) {
                    let ulSubtemas = document.createElement("ul")
                    ulSubtemas.setAttribute("class", "subtemas")
                    for (let subtema of subtemas) {
                        let liSubtema = document.createElement("li")
                        liSubtema.setAttribute("id", subtema["key"])
                        liSubtema.innerHTML = subtema["key"]
                        ulSubtemas.appendChild(liSubtema)
                    }
                    liTema.appendChild(ulSubtemas)
                }
                ulTemas.appendChild(liTema)
            }
            firstUl.appendChild(ulTemas)
        };

        rootElement.appendChild(firstUl)
    });