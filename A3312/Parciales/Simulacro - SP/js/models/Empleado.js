import { Persona } from "./Persona.js";

export class Empleado extends Persona {

    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }

    getSueldo() {
        return this.sueldo;
    }

    getVentas() {
        return this.ventas;
    }

    setSueldo(sueldo) {
        if (sueldo > 0) {
            this.sueldo = sueldo;
        }
    }

    setVentas(ventas) {
        if (ventas > 0) {
            this.ventas = ventas;
        }
    }

    toString() {
        return `${super.toString()}, sueldo: ${this.sueldo}, ventas: ${this.ventas}`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            sueldo: this.sueldo,
            ventas: this.ventas
        }
    }
}