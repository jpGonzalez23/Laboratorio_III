// app.js
import { personas } from "./data/personas.js";

// Selecciona el cuerpo de la tabla
const tbodyPersonas = document.getElementById("tbody-personas");

// Función para mostrar personas en la tabla
function mostrarPersonas() {
    // Limpiar el contenido actual de la tabla
    tbodyPersonas.innerHTML = '';

    // Recorrer la lista de personas y agregar cada una como una fila en la tabla
    personas.forEach(persona => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona.sueldo || persona.compras || 'N/A'}</td>
            <td>${persona.ventas || persona.telefono || 'N/A'}</td>
            <td>
                <button class="btn-modificar" data-id="${persona.id}">Modificar</button>
                <button class="btn-eliminar" data-id="${persona.id}">Eliminar</button>
            </td>
        `;

        // Agregar la fila a la tabla
        tbodyPersonas.appendChild(fila);
    });

    // Agregar eventos a los botones de modificar y eliminar
    document.querySelectorAll(".btn-modificar").forEach(button => {
        button.addEventListener("click", e => modificarPersona(e.target.dataset.id));
    });
    document.querySelectorAll(".btn-eliminar").forEach(button => {
        button.addEventListener("click", e => eliminarPersona(e.target.dataset.id));
    });
}

// Función para manejar la modificación (por implementar)
function modificarPersona(id) {
    console.log(`Modificar persona con ID: ${id}`);
}

// Función para manejar la eliminación (por implementar)
function eliminarPersona(id) {
    console.log(`Eliminar persona con ID: ${id}`);
}

// Llama a la función para mostrar las personas al cargar el script
mostrarPersonas();
