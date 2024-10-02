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
        } else {
            throw new Error("La altura máxima debe ser mayor a 0.");
        }
    }

    getAutonomia() {
        return this.autonomia;
    }

    setAutonomia(autonomia) {
        if (autonomia > 0) {
            this.autonomia = autonomia;
        } else {
            throw new Error("La autonomía debe ser mayor a 0.");
        }
    }

    toString() {
        return `${super.toString()}, Altura Máxima: ${this.altMax}, Autonomía: ${this.autonomia}`;
    }
}
