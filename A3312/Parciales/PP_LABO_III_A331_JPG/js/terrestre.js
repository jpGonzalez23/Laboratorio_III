import { Vehiculo } from "./vehiculo.js";

export default class Terrestre extends Vehiculo {
    cantPue;
    cantRue;

    constructor(id, modelo, anioFabricado, velocidadMaxima, cantidadPuertas, cantidadRuedas) {
        super(id, modelo, anioFabricado, velocidadMaxima);
        this.cantPue = cantidadPuertas;
        this.cantRue = cantidadRuedas;
    }

    getCantidadPuertas() {
        return this.cantPue;
    }

    setCantidadPuertas(cantidadPuertas) {
        if(cantidadPuertas >= 0) {
            this.cantPue = cantidadPuertas;
        }
    }

    getCantidadRuedas() {
        return this.cantRue;
    }
    
    setCantidadRuedas(cantidadRuedas) { 
        if(cantidadRuedas > 0) {
            this.cantRue = cantidadRuedas;
        }
    }

    toString() {
        return super.toString() + `, cantidad de puertas: ${this.cantPue}, cantidad de ruedas: ${this.cantRue}`;
    }
}