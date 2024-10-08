import { Vehiculo } from "./vehiculo.js";

export default class Aereo extends Vehiculo {
    altMax;
    autonomia;

    constructor(id, modelo, anioFabricado, velocidadMaxima, alturaMaxima, autonomia) {
        super(id, modelo, anioFabricado, velocidadMaxima);
        this.altMax = alturaMaxima;
        this.autonomia = autonomia;
    }

    getAlturaMaxima() {
        return this.altMax;
    }

    setAlturaMaxima(alturaMaxima) {
        if (alturaMaxima > 0) {
            this.altMax = alturaMaxima;
        }
    }

    getAutonomia() {
        return this.autonomia;
    }

    setAutonomia(autonomia) {
        if (autonomia > 0) {
            this.autonomia = autonomia;
        }
    }

    toString() {
        return `${super.toString()}, Altura Máxima: ${this.getAlturaMaxima()}, Autonomía: ${this.getAutonomia()}`;
    }
    
    toJson() {
        return JSON.stringify(this);
    }
}
