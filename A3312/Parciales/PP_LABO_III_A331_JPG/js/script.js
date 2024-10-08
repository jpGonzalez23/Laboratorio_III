import Aereo from './aereo.js';
import Terrestre from './terrestre.js';

// JSON de vehículos como cadena
let vehiculosData = '[{ "id": 14, "modelo": "Ferrari F100", "anoFab": 1998, "velMax": 400, "cantPue": 2, "cantRue": 4 }, { "id": 51, "modelo": "Dodge Viper", "anoFab": 1991, "velMax": 266, "cantPue": 2, "cantRue": 4 },{ "id": 67, "modelo": "Boeing CH-47 Chinook", "anoFab": 1962, "velMax": 302, "altMax": 6, "autonomia": 1200 },{ "id": 666, "modelo": "Aprilia RSV 1000 R", "anoFab": 2004, "velMax": 280, "cantPue": 0, "cantRue": 2 }, { "id": 872, "modelo": "Boeing 747-400", "anoFab": 1989, "velMax": 988, "altMax": 13, "autonomia": 13450 }, { "id": 742, "modelo": "Cessna CH-1 Skyhook", "anoFab": 1953, "velMax": 174, "altMax": 3, "autonomia": 870 }]';
const vehiculosJson = JSON.parse(vehiculosData);

// Mapeo de los datos a las instancias de las clases
let vehiculos = vehiculosJson.map(v => {
    if ('cantPue' in v && 'cantRue' in v) {
        return new Terrestre(v.id, v.modelo, v.anoFab, v.velMax, v.cantPue, v.cantRue);
    } else if ('autonomia' in v && 'altMax' in v) {
        return new Aereo(v.id, v.modelo, v.anoFab, v.velMax, v.altMax, v.autonomia);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tablaVehiculos = document.getElementById('tabla-vehiculo');
    const filtro = document.getElementById('filtrar');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const abmForm = document.getElementById('abm-form');
    const volverBtn = document.getElementById('volver');
    const agregarBtn = document.getElementById('guardar-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');
    const promedioVehiculo = document.getElementById('promedio-vehiculo');
    const calcularPromedio = document.getElementById('calcular-btn');
    let editandoVehiculo = null;  // Variable para manejar la edición

    const MostrarDatos = () => {
        tablaVehiculos.innerHTML = '';
        const filtradas = vehiculos.filter(v => {
            return filtro.value === 'todos' ||
                (filtro.value === 'terrestre' && v instanceof Terrestre) ||
                (filtro.value === 'aereo' && v instanceof Aereo);
        });

        filtradas.forEach(vehiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-id">${vehiculo.id}</td>
                <td class="col-modelo">${vehiculo.modelo}</td>
                <td class="col-anio-fabricado">${vehiculo.anoFab}</td>
                <td class="col-velocidad-maxima">${vehiculo.velMax}</td>
                <td class="col-altura-maxima">${vehiculo.altMax || 'N/A'}</td>
                <td class="col-autonomia">${vehiculo.autonomia || 'N/A'}</td>
                <td class="col-cantidad-puertas">${vehiculo.cantPue || 'N/A'}</td>
                <td class="col-cantidad-ruedas">${vehiculo.cantRue || 'N/A'}</td>
                <td>
                    <button onclick="eliminar(${vehiculo.id})">Eliminar</button>
                    <button onclick="editarVehiculo(${vehiculo.id})">Editar</button>
                </td>
            `;
            tablaVehiculos.appendChild(row);
        });
    };

    const actualizarJsonData = () => {
        // Actualiza la cadena JSON en la variable vehiculosData
        vehiculosData = JSON.stringify(vehiculos);
    };

    window.eliminar = function (id) {
        vehiculos = vehiculos.filter(v => v.id !== id);
        actualizarJsonData(); // Actualiza el JSON después de eliminar
        MostrarDatos();
    };

    filtro.addEventListener('change', MostrarDatos);

    calcularPromedio.addEventListener('click', () => {
        const filtradas = vehiculos.filter(v => {
            return filtro.value === 'todos' ||
                (filtro.value === 'terrestre' && v instanceof Terrestre) ||
                (filtro.value === 'aereo' && v instanceof Aereo);
        });

        const promedio = filtradas.reduce((acc, v) => acc + v.velMax, 0) / filtradas.length;
        promedioVehiculo.textContent = `Promedio de velocidad: ${promedio.toFixed(2)}`;
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            const colClass = e.target.id.replace('col-', '');
            document.querySelectorAll(`.col-${colClass}`).forEach(td => {
                td.style.display = e.target.checked ? '' : 'none';
            });
        });
    });

    document.getElementById('agregar-vehiculo').addEventListener('click', () => {
        formDatos.style.display = 'none';
        formAbm.style.display = 'block';
        abmForm.reset();
        editandoVehiculo = null;  // Limpiar el modo de edición
    });

    volverBtn.addEventListener('click', () => {
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
    });


    abmForm.addEventListener('submit', e => {
        e.preventDefault();

        const modelo = document.getElementById('modelo').value;
        const anoFab = parseInt(document.getElementById('anio-fabricado').value);
        const velMax = parseInt(document.getElementById('velocidad-maxima').value);
        const altMax = document.getElementById('altura-maxima').value ? parseInt(document.getElementById('altura-maxima').value) : null;
        const autonomia = document.getElementById('autonomia').value ? parseInt(document.getElementById('autonomia').value) : null;
        const cantdPue = document.getElementById('cantidad-puertas').value ? parseInt(document.getElementById('cantidad-puertas').value) : null;
        const cantRue = document.getElementById('cantidad-ruedas').value ? parseInt(document.getElementById('cantidad-ruedas').value) : null;
        const tipo = document.getElementById('tipo').value;

        if (!modelo || !anoFab || !velMax || !tipo) {
            alert('Debe completar todos los campos obligatorios y seleccionar un tipo.');
            return;
        }

        if (editandoVehiculo) {
            // Actualizar el vehículo
            editandoVehiculo.modelo = modelo;
            editandoVehiculo.anoFab = anoFab;
            editandoVehiculo.velMax = velMax;

            if (editandoVehiculo instanceof Terrestre) {
                editandoVehiculo.cantPue = cantdPue;
                editandoVehiculo.cantRue = cantRue;
            } else if (editandoVehiculo instanceof Aereo) {
                editandoVehiculo.altMax = altMax;
                editandoVehiculo.autonomia = autonomia;
            }
        } else {
            // Crear un nuevo vehículo
            const id = vehiculos.length ? vehiculos[vehiculos.length - 1].id + 1 : 1;
            let nuevoVehiculo;

            if (tipo === 'terrestre') {
                nuevoVehiculo = new Terrestre(id, modelo, anoFab, velMax, cantdPue, cantRue);
            } else if (tipo === 'aereo') {
                nuevoVehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
            }

            vehiculos.push(nuevoVehiculo);
        }

        actualizarJsonData(); // Actualiza la cadena JSON después de agregar o editar
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
        MostrarDatos();
    });

    window.editarVehiculo = function (id) {
        const vehiculo = vehiculos.find(v => v.id === id);
        if (!vehiculo) return;

        editandoVehiculo = vehiculo;
        formDatos.style.display = 'none';
        formAbm.style.display = 'block';

        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('anio-fabricado').value = vehiculo.anoFab;
        document.getElementById('velocidad-maxima').value = vehiculo.velMax;

        if (vehiculo instanceof Aereo) {
            document.getElementById('tipo').value = 'aereo';
            document.getElementById('altura-maxima').value = vehiculo.altMax;
            document.getElementById('autonomia').value = vehiculo.autonomia;
            document.getElementById('cantidad-puertas').style.display = 'none';
            document.getElementById('cantidad-ruedas').style.display = 'none';
        } else if (vehiculo instanceof Terrestre) {
            document.getElementById('tipo').value = 'terrestre';
            document.getElementById('cantidad-puertas').value = vehiculo.cantPue;
            document.getElementById('cantidad-ruedas').value = vehiculo.cantRue;
            document.getElementById('altura-maxima').style.display = 'none';
            document.getElementById('autonomia').style.display = 'none';
        }

        document.getElementById('tipo').disabled = true; // No permitir cambiar el tipo en la edición
    };

    MostrarDatos();
});
