import { Persona } from "./Persona.js";

export class Empleado extends Persona {
    sueldo;
    ventas;

    constructor(nombre, apellido, edad, sueldo, ventas) {
        super(nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }

    getSueldo() {
        return this.sueldo;
    }

    setSueldo(sueldo) {
        if(sueldo > 0) {
            this.sueldo = sueldo;
        }
    }

    getVentas() {
        return this.ventas;
    }

    setVenta(ventas) {
        if(ventas > 0) {
            this.ventas = ventas;
        }
    }

    toStrig() { 
        return `${super.toStrig()}, Sueldo: ${this.getSueldo()}, Ventas: ${this.getVentas()}`;
    }

    toJson() {
        const baseData = JSON.parse(super.toJson());
        baseData.sueldo = this.sueldo;
        baseData.ventas = this.ventas;
        return JSON.stringify(baseData);
    }
}