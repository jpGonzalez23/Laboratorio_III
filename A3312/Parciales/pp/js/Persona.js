export class Persona {
    static contadorId = 0;
    #id;
    nombre;
    apellido;
    edad;

    constructor(nombre, apellido, edad) {
        this.#id = ++Persona.contadorId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    getId() {
        return this.#id;
    }
    
    getNombre() {
        return this.nombre;
    }

    getApellido() {
        return this.apellido;
    }

    getEdad() {
        return this.edad;
    }

    setId(id){
        if(id > 0) {
            this.#id = id;
        }
    }

    setNombre(nombre){
        if(nombre) {
            this.nombre = nombre;
        }
    }

    setApellido(apellido) {
        if(apellido) {
            this.apellido = apellido;
        }
    }

    setEdad(edad) {
        if(edad > 0) {
            this.edad = edad;
        }
    }

    toStrig() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
    }

    toJson() {
        return JSON.stringify({
            id: this.#id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad
        });
    }
}