// guardando api

const API = 'https://rickandmortyapi.com/api/character'
const apiLocation ='https://rickandmortyapi.com/api/location'


// promesa para levantar la api y el paginado
const getAPI = (apiURL) => {
    return fetch(apiURL)
        .then( response => response.json() )
        .then( json => { 
            getPersonajes(json),
            getPaginado(json.info)
        })
}

// carga de personajes en el html

const getPersonajes = (data) => {
    let html = '';

    data.results.forEach(personaje => {
        html +=' <article class="personaje">' 
        html +='<div class="image-personaje">'
        html +=`<img src="${personaje.image}" alt="personaje" class="img-personaje">`
        html +='</div>'
        html +=`<h2 class="nombre-personaje">${personaje.name}</h2>`
        html +=`<span class="estado-personaje">Estado: ${personaje.status}</span>`
        html +=`<span class="especie-personaje">Especie: ${personaje.species}</span>`
        html += personaje.type != '' ? `<span class="tipo-personaje">Tipo: ${personaje.type}</span>` : ''
        html +=`<span class="genero-personaje">Genero: ${personaje.gender}</span>`
        html += personaje.origin.name == "unknown" ? `<span class="tipo-personaje">Origen: Desconocido</span>` : `<span class="tipo-personaje">Origen: ${personaje.origin.name}</span>`
        html +=`<span class="tipo-personaje">Localización: ${personaje.location.name}</span>`
        html +='</article>'        
    });
    document.getElementById('personajes').innerHTML = html;
}

// paginado

const getPaginado = (info) => {

    let anteriorDisable = info.prev == null ? 'disabled' : '';
    let siguienteDisable = info.next == null ? 'disabled' : '';

    
    let html =`<li class="page-item ${anteriorDisable}"><a class="page-link" onclick="getAPI('${info.prev}')" href="#inicio">Anterior</a></li>`
    html += `<li class="page-item ${siguienteDisable}"><a class="page-link" onclick="getAPI('${info.next}')" href="#inicio">Siguiente</a></li>`
    
    document.getElementById('paginado').innerHTML = html;
}


getAPI(API, apiLocation);
