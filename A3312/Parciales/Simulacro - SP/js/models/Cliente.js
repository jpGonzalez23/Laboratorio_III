import { Persona } from "./Persona.js";

export class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }

    getCompras() {
        return this.compras;
    }
    setCompras(compras) {
        if (compras > 0) {
            this.compras = compras;
        }
    }

    getTelefono() {
        return this.telefono;
    }

    setTelefono(telefono) {
        if (typeof telefono === 'string' && telefono.length === 10) {
            this.telefono = telefono;
        }
    }

    toString() {
        return `${super.toString()}, compras: ${this.compras}, telefono: ${this.telefono}`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            compras: this.compras,
            telefono: this.telefono
        }
    }
}   