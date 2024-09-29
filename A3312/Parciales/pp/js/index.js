import { Empleado } from "./Empleado.js";
import { Cliente } from "./Cliente.js";

const personasData = [
    { tipo: 'empleado', nombre: "Marcelo", apellido: "Luque", edad: 45, ventas: 15000, sueldo: 2000 },
    { tipo: 'empleado', nombre: "Ramiro", apellido: "Escobar", edad: 35, ventas: 6000, sueldo: 1000 },
    { tipo: 'empleado', nombre: "Facundo", apellido: "Cairo", edad: 30, ventas: 500, sueldo: 15000 },
    { tipo: 'cliente', nombre: "Fernando", apellido: "Nieto", edad: 18, compras: 8000, telefono: "152111131" },
    { tipo: 'cliente', nombre: "Manuel", apellido: "Loza", edad: 20, compras: 50000, telefono: "42040077" },
    { tipo: 'cliente', nombre: "Nicolas", apellido: "Serrano", edad: 23, compras: 7000, telefono: "1813181563" }
];

const personas = personasData.map(p => {
    if(p.tipo === 'empleado') {
        return new Empleado(p.nombre, p.apellido, p.edad, p.sueldo, p.ventas);
    }
    else {
        return new Cliente(p.nombre, p.apellido, p.edad, p.compras, p.telefono);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tablePersonas = document.getElementById('tabla-personas');
    const filtro = document.getElementById('filtrar');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const abmForm = document.getElementById('abm-form');
    const volverBtn = document.getElementById('volver');

    const MostrarDatos = () => {
        tablePersonas.innerHTML = '';
        const filtradas = personas.filter( p => {
            return filtro.value === 'todos' || 
                (filtro.value === 'empleado' && p.sueldo) || 
                (filtro.value === 'clientes' && p.telefono);
        });

        filtradas.forEach(persona => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-nombre">${persona.nombre}</td>
                <td class="col-apellido">${persona.apellido}</td>
                <td class="col-edad">${persona.edad}</td>
                <td class="col-ventas-compras">${persona.ventas || persona.compras}</td>
                <td class="col-sueldo-telefono">${persona.sueldo || persona.telefono}</td>
                <td><button onclick="editarPersona(${persona.id})">Editar</button></td>
            `;
            tablePersonas.appendChild(row);
        });
    }

    filtro.addEventListener('change', MostrarDatos);

    window.editarPersona = id => {
        const persona = personas.find(p => p.id === id);
        if(persona) {
            document.getElementById('nombre').value = persona.nombre;
            document.getElementById('apellido').value = persona.apellido;
            document.getElementById('edad').value = persona.edad;
            document.getElementById('ventas-compras').value = persona.ventas-compras;
            document.getElementById('suledo-telefono').value = persona.suledo-telefono;

            formDatos.style.display = 'none';
            formAbm.style.display = 'block';
        }
    };

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            const colClass = e.target.id.replace('col-', ''); // Tomamos directamente el id sin alterar mucho.
            document.querySelectorAll(`.col-${colClass}`).forEach(td => {
                td.style.display = e.target.checked ? '' : 'none';
            });
        });
    });

    document.getElementById('agregar-persona').addEventListener('click', () => {
        formDatos.style.display = 'none';
        formAbm.style.display = 'block';
    });

    volverBtn.addEventListener('click', () => {
        formDatos.style.display = 'block';
        formAbm.style.display = 'none';
    });

    abmForm.addEventListener('submit', e => {
        e.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = parseInt(document.getElementById('edad').value);
        const ventasCompras = parseInt(document.getElementById('ventas-compras').value);
        const sueldoTelefono = document.getElementById('sueldo-telefono').value;

        const nuevaPersona = tipo === 'empleado'
            ? new Empleado(nombre, apellido, edad, sueldoTelefono, ventasCompras) 
            : new Cliente(nombre, apellido, edad, ventasCompras, sueldoTelefono);

        personas.push(nuevaPersona);
        MostrarDatos();
        formDatos.style.display = 'block';
        formAbm.style.display = 'none';
    });

    MostrarDatos();
});



