export class Vehiculo { 
    static contadorID = 0
    #id;
    modelo;
    anoFab;
    velMax;

    constructor(modelo, anioFabricado, velocidadMaxima) { 
        this.#id = ++Vehiculo.contadorID;
        this.modelo = modelo;
        this.anioFabricado = anioFabricado;
        this.velMax = velocidadMaxima;
    }   

    getId(){
        return this.#id;
    }

    setId(id) {
        if(id > 0) {
            this.#id = id;
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
        return `ID: ${this.id}, modelo: ${this.modelo}, anioFabricado: ${this.anoFab}, velocidadMaxima: ${this.velMax}`;
    }
}