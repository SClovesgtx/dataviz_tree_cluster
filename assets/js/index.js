
function createDiv(className='', idName='', value=''){
    const div = document.createElement("div")
    if (className != ''){
        div.setAttribute("class", className)
    } 
    if (idName != '') {
        div.setAttribute("id", idName)
    } 
    if (value != '') {
        div.innerText = value
    }
    return div
}

function cleanItemName(stringValue){
    // replace 'spaces' and '/' for '-'
    return stringValue.replace(/[ \/]/gm, '-')
}

function createId(valueList=[]){
    return valueList.join('-')
}


// https://github.com/musclesoft/jquery-connections/wiki
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const rootElement = document.querySelector('#root')
        const cadeias = data["cadeias"]["buckets"]
        const firstDiv = createDiv(className="cadeias")
        let cadeiaNumber = 0
        for (let cadeia of cadeias) {
            cadeiaNumber += 1
            let divCadeia = createDiv(
                                className="cadeia", 
                                idName=cadeia["key"]
                            )
            let cadeiaName = cleanItemName(cadeia['key'])
            let cadeiaId = createId(['cadeia', cadeiaName, cadeiaNumber])
            let divCadeiaName = createDiv(
                                className='cadeiaName',
                                idName=cadeiaId,
                                value=cadeia["key"]
                            )
            divCadeia.appendChild(divCadeiaName)
            let temas = cadeia["temas"]["buckets"]
            let temaNumber = 0
            for (let tema of temas){
                let temaName = cleanItemName(tema['key'])
                let divTema = createDiv(className="tema", idName=temaName)
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