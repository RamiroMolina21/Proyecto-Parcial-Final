function getJSONDeLocalStore(nombreLocalStore) {

    return JSON.parse(
        localStorage.getItem(nombreLocalStore) || "[]") 
}

function setJSONDeLocalStore(nombreLocalStore, arrayJSON) {

    localStorage.setItem(nombreLocalStore, 
        JSON.stringify(arrayJSON))    
}
