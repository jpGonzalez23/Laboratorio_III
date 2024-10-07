export class Vehiculo {
    id;
    modelo;
    anoFab;
    velMax;

    constructor(id, modelo, anioFabricado, velocidadMaxima) { 
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anioFabricado;
        this.velMax = velocidadMaxima;
    }   

    getId(){
        return this.id;
    }

    setId(id) {
        if(id > 0) {
            this.id = id;
        }
    }

    getModelo() {
        return this.modelo;
    }

    setModelo(modelo) {
        if(modelo.length > 0) {
            this.modelo = modelo;
        }
    }

    getAnioFabricado() {
        return this.anoFab;
    }

    setAnioFabricado(anioFabricado) {
        if(anioFabricado > 1885) {
            this.anioFabricado = anioFabricado;
        }
    }

    getVelocidadMaxima() {
        return this.velMax;
    }

    setVelocidadMaxima(velocidadMaxima) {
        if(velocidadMaxima > 0) {
            this.velMax = velocidadMaxima;
        }
    }

    toString() {
        return `ID: ${this.getId()}, modelo: ${this.getModelo()}, anioFabricado: ${this.getAnioFabricado()}, velocidadMaxima: ${this.getVelocidadMaxima()}`;
    }
}