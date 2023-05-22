// Aquí necesitamos traer todos los personajes, por
// eso importamos nuestra función getCharacters
import { getCharacters } from "./services/getData.js";

// Tomamos el main container de nuestro Home y el loader
const container = document.querySelector('#characters');
const loader = document.getElementById('lds-ring');

const charactersList = async (page = 1) => { // por defecto le pasamos el page 1 por si no lo recibe
    // mostramos el loader antes de llamar a la API
    loader.style.display = 'grid';
    // pedimos los personajes
    const { results } = await getCharacters(page);

    // ocultamos el loader una vez que ya tenemos la respuesta
    loader.style.display = 'none';

    results.forEach(character => { // por cada personaje creamos un article con sus datos
        const article = document.createElement('article');
        article.setAttribute('class', 'character');
        article.innerHTML = `
    <img src="${character.image}" alt="">
    <h2>${character.name}</h2>
    <div>
    <p>${character.species}</p>
    <p class="${character.status.toLowerCase()}"></p>
    </div>
    <a href="/#/${character.id}">Ver detalle</a>`;// Al hacer click redirige a /#/idDelPersonaje


        container.appendChild(article);
    });
}

charactersList();

// Escuchamos cambios en la URL, atentos a cuando hagan click en un “ver detalle”
window.addEventListener('hashchange', () => {
    // Si el enlace lleva a /#/3, id toma el valor 3 que es el ID del personaje
    // hash.slice(1).toLocaleLowerCase().split('/')[1] Escucha el cambio de hash linea 28 en la URL Y Nos devuelve el item 1 +  saca la barra
    const id = location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
    localStorage.setItem('charID', id);// En el localStorage en el navegador se va a guardar una variabl charId con el numero de id
    //Nos manda a charatcter.html con charId =1, lo vemos an el inspector en Aaplication localStorage
    window.location.replace('/character.html');
});

