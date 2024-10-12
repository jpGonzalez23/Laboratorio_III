// Instalación
// Para usar TypeScript, necesitas instalarlo usando npm:
//  npm install -g typescript

// Para comenzar, puedes inicializar un archivo de configuración tsconfig.json:
// tsc --init

function saludar(name: string): string {
    return "hola, " + name;
}

let user: string = 'Juan';
console.log(saludar(user));


// Para compilar este archivo a JavaScript:
// tsc --watch

// Tipos basicos
let estado: boolean = true;
let edad: number = 45;
let nombre: string = 'Pepe';
let list: number[] = [1, 2, 3, 4, 6, 7];

// Interface
interface Person {
    firstName: string;
    lastName: string;
}

function saludando(obj: Person) {
    return "hola, " + obj.firstName;
}

let obj: Person = { firstName: "John", lastName: "Doe" };

console.log(saludando(obj));

/////////////Clases

class Student {
    private nombreCompleto: string;
    private edad: number;

    constructor(public nombre: string, public apellido: string, edad: number) {
        this.nombreCompleto = nombre + ' ' + apellido;
        this.edad = edad;
    }

    getData() {
        console.log(`${this.nombreCompleto}: ${this.edad}`);
    }
}

let student = new Student('Juan', 'Martinez', 19);
student.getData();
