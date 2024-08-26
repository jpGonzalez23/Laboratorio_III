import Anuncio_Auto from "./anuncio_auto.js";
let anuncios = leeStorage() || [];

const frm = document.forms[0];
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");

window.addEventListener("DOMContentLoaded", () => {
  handlerLoadTable();
  frm.addEventListener("submit", handlersubmit);
  btnEliminar.addEventListener("click", handlreEliminarAnuncio);
  btnCancelar.addEventListener("click", handlerCancelar);
  document.addEventListener("click", handlerClick); // le agreggo el evento click al documento
});

function handlerClick(e) {
  if (e.target.matches("td")) {
    //console.log(e.target.parentNode.dataset.id); // el id lo recupero asi porque lo meti en data-id,

    let id = e.target.parentNode.dataset.id;

    const anuncio = anuncios.filter((p) => p.id === parseInt(id))[0]; //filter devuelve un array de las coincidencias, entonces le paso la pos 0
    console.log("🚀 ~ handlerClick ~ anuncio:", anuncio);
    cargarFormulario(
      frm,
      id,
      anuncio.titulo,
      anuncio.transaccion,
      anuncio.descripcion,
      anuncio.precio,
      anuncio.puertas,
      anuncio.kms,
      anuncio.potencia
    ); //cargo el formulario con los datos de la tabla
    modificarFuncionBoton(e.target);
  } else if (!e.target.matches("input")) {
    modificarFuncionBoton(e.target);
    limpiaFormulario(frm);
  }
}

function handlerCancelar(e) {
  modificarFuncionBoton(e.target);
  limpiaFormulario(frm);
}

//le paso el boton que quiero cambiarle
function modificarFuncionBoton(target) {
  if (target.matches("td")) {
    btnGuardar.setAttribute("class", "oculto");
    btnEliminar.removeAttribute("class");
    btnCancelar.removeAttribute("class");
  } else {
    btnGuardar.removeAttribute("class");
    btnEliminar.setAttribute("class", "oculto");
    btnCancelar.setAttribute("class", "oculto");
  }
}

function cargarFormulario(formulario, ...datos) {
  //metodo que cargar el formulario con datos segun un ID recibido

  formulario.id.value = datos[0]; // este atributo esta como hidden, oculto
  formulario.titulo.value = datos[1];
  formulario.transaccion.value = datos[2];
  formulario.descripcion.value = datos[3];
  formulario.precio.value = datos[4];
  formulario.puertas.value = datos[5];
  formulario.kms.value = datos[6];
  formulario.potencia.value = datos[7];
}

function handlersubmit(e) {
  e.preventDefault();
  const frm = e.target;
  const nuevoAnuncio = new Anuncio_Auto(
    Date.now(),
    frm.titulo.value,
    frm.transaccion.value,
    frm.descripcion.value,
    frm.precio.value,
    frm.puertas.value,
    frm.kms.value,
    frm.potencia.value
  );
  console.log("Dando de Alta");
  console.log(nuevoAnuncio);
  altaAnuncio(nuevoAnuncio);
}

function altaAnuncio(anuncio) {
  inyectarSpinner();
  setTimeout(() => {
    anuncios.push(anuncio);
    handlerLoadTable();
    guardarStorage(anuncios);
    removerSpinner();
    limpiaFormulario(frm);
  }, 2000);
}

function handlreEliminarAnuncio(e) {
  if (confirm("Confirma la Eliminacion")) {
    inyectarSpinner();
    setTimeout(() => {
      let id = parseInt(frm.id.value);
      let anuncioAux = anuncios.filter((p) => p.id != id);
      anuncios = anuncioAux;
      guardarStorage(anuncios); //guardo el array en el storage
      removerSpinner();
      handlerLoadTable();
      limpiaFormulario(frm);
    }, 2000);
  }
}

function limpiaFormulario(formulario) {
  const frmArray = [...formulario];
  frmArray.forEach((element) => {
    let tipo = element.type;
    if (tipo == "text") {
      element.value = "";
    }
  });
}

function inyectarSpinner() {
  const spinner = document.createElement("img");
  const contenedor = document.getElementById("spinner-container");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");
  spinner.setAttribute("height", "64px");
  spinner.setAttribute("width", "64px");
  contenedor.appendChild(spinner);
}

function removerSpinner() {
  const contenedor = document.getElementById("spinner-container");
  contenedor.removeChild(contenedor.firstChild);
}

function guardarStorage(datos) {
  localStorage.setItem("anuncios", JSON.stringify(datos));
}

function leeStorage() {
  return JSON.parse(localStorage.getItem("anuncios"));
}

function handlerLoadTable(e) {
  const tabla = createTable(anuncios);
  const contenedor = document.getElementById("divTabla");
  renderizarTable(tabla, contenedor);
}

function renderizarTable(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

/**
 * Crea la tabla
 */
function createTable(items) {
  const tabla = document.createElement("table");
  tabla.appendChild(createThead(items[0]));
  tabla.appendChild(createTbody(items));
  return tabla;
}

function createThead(items) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in items) {
    if (key != "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function createTbody(items) {
  const tbody = document.createElement("tbody");
  items.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}
