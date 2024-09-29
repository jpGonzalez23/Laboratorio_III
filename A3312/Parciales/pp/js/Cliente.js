import { Persona } from './Persona.js';

export class Cliente extends Persona {
    compras;
    telefono;

    constructor(nombre, apellido, edad, compras, telefono) {
        super(nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }

    // Getters
    getCompras() {
        return this.compras;
    }

    getTelefono() {
        return this.telefono;
    }

    // toString() method
    toString() {
        return `${super.toString()}, Compras: ${this.compras}, Teléfono: ${this.telefono}`;
    }

    // toJSON() method
    toJSON() {
        const baseData = JSON.parse(super.toJSON());
        baseData.compras = this.compras;
        baseData.telefono = this.telefono;
        return JSON.stringify(baseData);
    }
}
