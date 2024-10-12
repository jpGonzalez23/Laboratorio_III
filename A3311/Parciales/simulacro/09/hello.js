"use strict";
// Instalación
// Para usar TypeScript, necesitas instalarlo usando npm:
//  npm install -g typescript
// Para comenzar, puedes inicializar un archivo de configuración tsconfig.json:
// tsc --init
function saludar(name) {
    return "hola, " + name;
}
let user = 'Juan';
console.log(saludar(user));
// Para compilar este archivo a JavaScript:
// tsc --watch
// Tipos basicos
let estado = true;
let edad = 45;
let nombre = 'Pepe';
let list = [1, 2, 3, 4, 6, 7];
function saludando(obj) {
    return "hola, " + obj.firstName;
}
let obj = { firstName: "John", lastName: "Doe" };
console.log(saludando(obj));
/////////////Clases
class Student {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreCompleto = nombre + ' ' + apellido;
        this.edad = edad;
    }
    getData() {
        console.log(`${this.nombreCompleto}: ${this.edad}`);
    }
}
let student = new Student('Juan', 'Martinez', 19);
student.getData();
