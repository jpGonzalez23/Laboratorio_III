export class Persona {
    /**
     * Constructor de la clase Personas
     * @param {number} id Identificador unico de la persona
     * @param {string} nombre Nombre de la persona
     * @param {string} apellido Apellidos de la persona
     * @param {number} edad Edad de la persona
     */
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    /**
     * Devuelve el identificador unico de la persona
     * @return {number} Identificador unico de la persona
     */
    getId() {
        return this.id;
    }


    /**
     * Devuelve el nombre de la persona
     * @return {string} Nombre de la persona
     */
    getNombre() {
        return this.nombre;
    }

    /**
     * Devuelve los apellidos de la persona
     * @return {string} Apellidos de la persona
     */
    getApellido() {
        return this.apellido;
    }


    /**
     * Devuelve la edad de la persona.
     */
    getEdad() {
        return this.edad;
    }

    /**
     * Establece el identificador unico de la persona
     * @param {number} id Identificador unico de la persona
     */
    setId(id) {
        if (id > 0 && typeof id === 'number') {
            this.id = id;
        }
    }

    /**
     * Establece el nombre de la persona
     * @param {string} nombre Nuevo nombre de la persona
     */
    setNombre(nombre) {
        if (typeof nombre === 'string') {
            this.nombre = nombre;
        }
    }

    /**
     * Set the last names of the person.
     * 
     * @param {string} apellidos Last names of the person to be set
     */
    setApellido(apellido) {
        if (typeof apellido === 'string') {
            this.apellido = apellido;
        }
    }

    /**
     * Establece la edad de la persona. La edad debe ser un n mero mayor que 15
     * @param {number} edad Edad de la persona
     */
    setEdad(edad) {
        if (edad > 15 && typeof edad === 'number') {
            this.edad = edad;
        }
    }

    /**
     * Convierte la informaci n de la persona en una cadena legible
     * @return {string} Cadena con la informaci n de la persona
     */
    toString() {
        return `id: ${this.id}, nombre: ${this.nombre}, apellido: ${this.apellido}, edad: ${this.edad}`;
    }

    /**
     * Convierte la informaci n de la persona en un objeto JSON
     * @return {object} Objeto JSON con la informaci n de la persona
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad
        };
    }

}