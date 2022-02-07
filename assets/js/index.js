
// https://github.com/musclesoft/jquery-connections/wiki
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const rootElement = document.querySelector('#root')
        const cadeias = data["cadeias"]["buckets"]
        const firstDiv = document.createElement("div")
        firstDiv.setAttribute("id", "cadeias")
        let cadeiaNumber = 0
        for (let cadeia of cadeias) {
            let divCadeia = document.createElement("div")
            divCadeia.setAttribute("id", cadeia["key"])
            divCadeia.setAttribute("class", "cadeia")
            let cadeiaName = cadeia['key'].replace(/[ \/]/gm, '-')
            let cadeiaId = `cadeia-${cadeiaName}-${cadeiaNumber+=1}`
            divCadeia.innerHTML = `<div id='${cadeiaId}' class="cadeiaName">${cadeia["key"]}</div>`
            let temas = cadeia["temas"]["buckets"]
            let divTemas = document.createElement("div")
            divTemas.setAttribute("class", "temas")
            let temaNumber = 0
            for (let tema of temas){
                let divTema = document.createElement("div")
                divTema.setAttribute("id", tema["key"])
                divTema.setAttribute("class", "tema")
                let temaName = tema['key'].replace(/[ \/]/gm, '-')
                let temaId = `${cadeiaName}-${temaName}-${temaNumber+=1}`
                divTema.innerHTML = `<div id='${temaId}' class="temaName">${tema["key"]}</div>`
                let subtemas = tema?.subtemas?.buckets
                if (subtemas) {
                    let divSubtemas = document.createElement("div")
                    divSubtemas.setAttribute("class", "subtemas")
                    let subTemaNumber = 0
                    for (let subtema of subtemas) {
                        let subTemaName = subtema['key'].replace(/[ \/]/gm, '-')
                        let subTemaId = `${cadeiaName}-${temaName}-${subTemaName}-${subTemaNumber+=1}`
                        let divSubtema = document.createElement("div")
                        divSubtema.setAttribute("id", subTemaId)
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
        cadeiaNumber = 0
        for (let cadeia of cadeias){
            let temas = cadeia["temas"]["buckets"]
            let cadeiaName = cadeia['key'].replace(/[ \/]/gm, '-')
            let cadeiaId = `cadeia-${cadeiaName}-${cadeiaNumber+=1}`
            temaNumber = 0
            for (let tema of temas){
                let temaName = tema['key'].replace(/[ \/]/gm, '-')
                let temaId = `${cadeiaName}-${temaName}-${temaNumber+=1}`
                let query = `#${cadeiaId}, #${temaId}`
                $(query).connections();
                let subtemas = tema?.subtemas?.buckets
                if (subtemas) {
                    subTemaNumber = 0
                    for (let subtema of subtemas) {
                        let subTemaName = subtema['key'].replace(/[ \/]/gm, '-')
                        let subTemaId = `${cadeiaName}-${temaName}-${subTemaName}-${subTemaNumber+=1}`
                        let query = `#${temaId}, #${subTemaId}`
                        $(query).connections();
                    }
                }
            }
        }
        // addConnections(data)
    });