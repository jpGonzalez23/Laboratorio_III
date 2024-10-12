
const ENDPOINT = "http://localhost:3000/personas";

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback

function onInit() {
  const model = { id: 3, nombre: "Pedro", edad: 35 };
  const newModel = { id: null, nombre: "Agustin", edad: 25 };

  // XMLHttpRequest
  // getAll();
  // getOne(model.id);
  // addOne(newModel);
  // editOne(model);
  // deleteOne(1);

  // Fetch
  // getAllFetch()
  // getOneFetch(model.id);
  // addOneFetch(newModel);
  // editOneFetch(model);
  // deleteOneFetch(model.id);
}

function getAll() {
  // Necesitaremos utilizar al elemento XMLHttpRequest
  // este objeto nos permite realizar peticiones asincronas
  // cuando tenemos la respuesta del servidor, lanza eventos
  // Nosotros le agregaremos manejadores a dichos eventos

  // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest

  let xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    //agregamos el manejador de eventos
    if (xhr.readyState == 4) {
      // Petición finalizada
      if (xhr.status == 200) {
        // todo OK
        console.log("todo OK");
      } else if (xhr.status == 404) {
        // No consiguió el recurso
        console.log("No consiguió el recurso");
      } else if (xhr.status >= 300 && xhr.status < 400) {
        // todos los 300 son fallas en el servidor
        console.log("todos los 300 son fallas en el servidor");
      } else {
        // otros estados
        console.log("otros estados");
      }

      if (xhr.status == 200) {
        // todo OK
        const obj = JSON.parse(xhr.responseText);

        console.log(obj);
      } else {
        // falló algo
        console.log("ERR " + xhr.status + " :" + xhr.statusText);
      }
    }
  });

  // y ahora debemos abrir la petición
  xhr.open("GET", `${ENDPOINT}`);

  // // lo ultimo que me queda es enviar la petición
  xhr.send();
}

function getOne(id) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    //agregamos el manejador de eventos
    if (xhr.readyState == 4) {
      // Petición finalizada
      if (xhr.status == 200) {
        // respuesta del servidor si actualiza con exito
        const obj = JSON.parse(xhr.responseText);
        console.log(obj);
      } else {
        // falló algo
        console.log("ERR " + xhr.status + " :" + xhr.statusText);
      }
    }
  });

  xhr.open("GET", `${ENDPOINT}/${id}`);

  xhr.send(); // lo convierto a un json string
}

function addOne(model) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    }
  };

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.open("POST", `${ENDPOINT}`);

  const str = JSON.stringify(model); // lo casteo a string JSON
  xhr.send(str);
}

function editOne(model) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    //agregamos el manejador de eventos
    if (xhr.readyState == 4) {
      // Petición finalizada
      if (xhr.status == 200) {
        // respuesta del servidor si actualiza con exito
        console.log("Actualizado con exito");
      } else {
        // falló algo
        console.log("ERR " + xhr.status + " :" + xhr.statusText);
      }
    }
  });

  // Ahora los datos lo pasamos via PUT, debido a que estamos por agregar/manipular el contenido del backend
  // debemos aclarar el tipo de dato que va a viajar en el cuerpo de la peticion
  xhr.open("PUT", `${ENDPOINT}/${model.id}`);
  xhr.setRequestHeader("content-type", "application/json");

  xhr.send(JSON.stringify(model)); // lo convierto a un json string
}

function deleteOne(id) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    //agregamos el manejador de eventos
    if (xhr.readyState == 4) {
      // Petición finalizada
      if (xhr.status == 200) {
        // respuesta del servidor si actualiza con exito
        console.log("Eliminado con exito");
      } else {
        // falló algo
        console.log("ERR " + xhr.status + " :" + xhr.statusText);
      }
    }
  });

  xhr.open("DELETE", `${ENDPOINT}/${model.id}`);

  xhr.send("sdsddssdds"); // lo convierto a un json string
}

////////////////////////////////////////////////////////////////////////////////////

// Uso del Fetch
// es una funcion que nos devuelve una Promesa

async function getAllFetch() {
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}`, options);
  res = await res.json();

  console.log(res);
}

async function getOneFetch(id) {
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}/${model.id}`, options);
  res = await res.json();

  console.log(res);
}

async function addOneFetch(model) {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  };

  let res = await fetch(`${ENDPOINT}`, options);
  res = await res.json();

  console.log(res);
  console.log("Agregado con Exito");
}

async function editOneFetch(model) {
  const options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  };

  let res = await fetch(`${ENDPOINT}/${model.id}`, options);

  console.log(res);
  console.log("Actualizado con Exito");
}

async function deleteOneFetch(id) {
  const options = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}/${model.id}`, options);
  console.log(res);
  console.log("Eliminado con Exito");
}
