// Esto no es un lenguaje compilado, si no interpretado
// Entonces el navegador recorre el archivo js linea a linea

// En js, a esto lo llamamos callbacks: es pasarle como parametro a una funcion, otra función
// Js es asincronico, es decir, en algun momento se cargará el navegador. Recién ahí se ejecuta la funcion

// document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis

document.addEventListener("DOMContentLoaded", () => {
  onInit();
});

function onInit() {
  const form = document.getElementById("form-usuario");

  form.addEventListener("submit", (e) => {
    // Luego del primer parcial, comenzaremos a enviar los datos a un externo
    // evito el comportamiento que realiza por defecto
    e.preventDefault();

    for (let index = 0; index < form.elements.length; index++) {
      const element = form.elements[index];
      let str = element.name + ": " + element.value;

      // es una buena práctica utilizar === (igualdad estricta) para evitar resultados inesperados debido a la coerción de tipos.
      // Ejemplo: console.log(false == 0);
      if (element.type === "radio") {
        str = element.name + ": " + (element.checked ? "on" : "off");
      }

      console.log(str);
    }
  });
}
