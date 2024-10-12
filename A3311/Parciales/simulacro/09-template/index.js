/*
  Los templates en HTML proporcionan una forma de definir fragmentos de
  contenido que pueden ser clonados y utilizados dinámicamente en una página web

  Reutilización de código
  Generación dinámica de contenido
  Mejora del rendimiento
  Mantenimiento del código
  Claridad del código
*/

document.addEventListener("DOMContentLoaded", () => {
  onInit();
});

function onInit() {
  let arr = [
    {
      src: "https://rickandmortyapi.com/api/character/avatar/175.jpeg",
      alt: "Imagen 1",
      description: "Jerry Smith",
    },
    {
      src: "https://rickandmortyapi.com/api/character/avatar/239.jpeg",
      alt: "Imagen 2",
      description: "Mr. Goldenfold",
    },
    {
      src: "https://rickandmortyapi.com/api/character/avatar/292.jpeg",
      alt: "Imagen 3",
      description: "Rick K-22",
    },
  ];

  // se selecciona el elemento del DOM con el id, que actuará como contenedor para las imágenes.
  const contenedor = document.getElementById("contenedor-imagenes");

  // se selecciona el contenido del elemento template
  const template = document.getElementById("imagen-template").content;

  arr.forEach((image) => {
    // Clona el contenido del template
    const clone = document.importNode(template, true);

    // Rellena los datos de la imagen
    clone.querySelector("img").src = image.src;
    clone.querySelector("img").alt = image.alt;
    clone.querySelector(".card-text").textContent = image.description;

    // Añade el item clonado al contenedor de la galería
    contenedor.appendChild(clone);
  });
}

/*
  El código está diseñado para tomar una lista de imágenes con sus respectivas descripciones, 
  clonarlas desde un template predefinido y añadirlas a un contenedor en el DOM una vez que la 
  página se ha cargado completamente. Esto permite la creación dinámica de contenido en la página 
  web utilizando datos que en ese caso están predefinidos.
*/
