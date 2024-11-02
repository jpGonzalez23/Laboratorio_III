// Selecciona el cuerpo de la tabla
const tbodyPersonas = document.getElementById("tbody-personas");
let personas = [];
let currentPersona = null;

/**
 * Carga la lista de personas, empleados y clientes desde el servidor.
 */
function cargarDatos() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/sp-PersonasEmpleadosClientes/PersonasEmpleadosClientes.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                personas = JSON.parse(xhr.responseText);
                mostrarLista();
            }
            else {
                alert("Error al cargar los datos");
            }
        }
    };
    xhr.send();
}

/**
 * Muestra la lista de personas, empleados y clientes en el cuerpo de la tabla. 
 */
function mostrarLista() {
    tbodyPersonas.innerHTML = '';
    personas.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="col-id">${p.id}</td>
            <td class="col-nombre">${p.nombre}</td>
            <td class="col-apellido">${p.apellido}</td>
            <td class="col-edad">${p.edad}</td>
            <td class="col-ventas">${p.ventas || 'N/A'}</td>
            <td class="col-sueldo">${p.sueldo || 'N/A'}</td>
            <td class="col-compras">${p.compras || 'N/A'}</td>
            <td class="col-telefono">${p.telefono || 'N/A'}</td>
            <td class="col-modificar"><button class="btn-modificar" onclick="modificar(${p.id})">Modificar</button></td>
            <td class="col-eliminar"><button class="btn-eliminar" onclick="eliminar(${p.id})">Eliminar</button></td>
        `;
        tbodyPersonas.appendChild(fila);
    });
}

/**
 * Muestra el formulario de alta/baja/modificación ocultando el listado de personas.
 */
window.mostrarFormularioABM = function () {
    document.getElementById("form-datos").style.display = "none";
    document.getElementById("form-abm").style.display = "block";
}

/**
 * Cierra el formulario de alta/baja/modificaci n y vuelve a mostrar la lista de personas.
 */
window.cancelar = function () {
    document.getElementById("form-datos").style.display = "block";
    document.getElementById("form-abm").style.display = "none";
}

/**
 * Realiza una peticion PUT para dar de alta una nueva persona o empleado.
 * @param {object} personaData - Objeto con los datos de la persona a dar de alta.
 * @property {string} personaData.nombre - Nombre de la persona.
 * @property {string} personaData.apellido - Apellido de la persona.
 * @property {number} personaData.edad - Edad de la persona.
 * @property {number} [personaData.ventas] - Ventas del empleado.
 * @property {number} [personaData.sueldo] - Sueldo del empleado.
 * @property {number} [personaData.compras] - Compras del cliente.
 * @property {string} [personaData.telefono] - Tel fono del cliente.
 * @return {Promise} - Promesa que se cumple cuando la petici n es exitosa.
 */
window.alta = function () {

    const nombre = document.getElementById("txtNombre").value;
    const apellido = document.getElementById("txtApellido").value;
    const edad = document.getElementById("txtEdad").value;
    const ventas = document.getElementById("txtVentas").value;
    const sueldo = document.getElementById("txtSueldo").value;
    const compras = document.getElementById("txtCompras").value;
    const telefono = document.getElementById("txtTelefono").value;

    const personaData = {
        nombre: nombre,
        apellido: apellido,
        edad: parseInt(edad),
    };

    if (ventas && sueldo) {
        personaData.ventas = parseFloat(ventas);
        personaData.sueldo = parseFloat(sueldo);
    } else if (compras && telefono) {
        personaData.compras = parseFloat(compras);
        personaData.sueldo = telefono;
    }
    else {
        alert("Complete los campos requeridos");
        return;
    }

    document.getElementById('spinner').style.display = 'block';
    document.getElementById('form-abm').style.display = 'none';
    mostrarLista();
    fetchAlta(personaData);

}

/**
 * Realiza una peticion PUT para dar de alta una nueva persona o empleado.
 * @param {object} personaData - Objeto con los datos de la persona a dar de alta.
 * @property {string} personaData.nombre - Nombre de la persona.
 * @property {string} personaData.apellido - Apellido de la persona.
 * @property {number} personaData.edad - Edad de la persona.
 * @property {number} [personaData.ventas] - Ventas del empleado.
 * @property {number} [personaData.sueldo] - Sueldo del empleado.
 * @property {number} [personaData.compras] - Compras del cliente.
 * @property {string} [personaData.telefono] - Tel fono del cliente.
 * @return {Promise} - Promesa que se cumple cuando la petici n es exitosa.
 */
function fetchAlta(personaData) {
    const url = 'http://localhost/sp-PersonasEmpleadosClientes/PersonasEmpleadosClientes.php';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personaData)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error al cargar los datos');
            }
        })
        .then(data => {
            personaData.id = data.id;
            personas.push(personaData);
            mostrarLista();
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('form-datos').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('form-abm').style.display = 'block';
            alert(error.message);
        });

}

/**
 * Muestra el formulario de alta/actualizaci n para la persona con el
 * identificador unico id.
 * @param {number} id Identificador unico de la persona
 */
window.modificar = async function (id) {
    document.getElementById('accion-titulo').innerHTML = 'Modificación';
    const persona = personas.find(p => p.id === id);

    if (persona) {
        currentPersona = persona.id;
        document.getElementById("txtNombre").value = persona.nombre;
        document.getElementById("txtApellido").value = persona.apellido;
        document.getElementById("txtEdad").value = persona.edad;

        if(persona.ventas !== undefined) {
            document.getElementById("txtVentas").value = persona.ventas;
            document.getElementById("txtVentas").style.display = 'block';

            document.getElementById("txtCompras").style.display = 'none';
            document.getElementById("txtTelefono").style.display = 'none';
        }

        if(persona.sueldo !== undefined) {
            document.getElementById("txtSueldo").value = persona.sueldo;
            document.getElementById("txtSueldo").style.display = 'block';

            document.getElementById("txtCompras").style.display = 'none';
            document.getElementById("txtTelefono").style.display = 'none';
        }

        if(persona.compras !== undefined) {
            document.getElementById("txtCompras").value = persona.compras;
            document.getElementById("txtCompras").style.display = 'block';
        }

        if(persona.telefono !== undefined) {
            document.getElementById("txtTelefono").value = persona.telefono;
            document.getElementById("txtTelefono").style.display = 'block';
        }

        mostrarFormularioABM();
    }
}

/**
 * Elimina la persona con el identificador unico id.
 * @param {number} id Identificador unico de la persona a eliminar
 */
window.eliminar = async function (id) {


}

/**
 * Evento que se lanza cuando la pagina ha terminado de cargar. En este caso,
 * se llama al metodo cargarDatos() para obtener los datos desde el servidor.
 */
window.onload = function () {
    cargarDatos();
}
