import Aereo from './aereo.js';
import Terrestre from './terrestre.js';

let vehiculosData = [
    { "id": 14, "modelo": "Ferrari F100", "anoFab": 1998, "velMax": 400, "cantPue": 2, "cantRue": 4 },
    { "id": 51, "modelo": "Dodge Viper", "anoFab": 1991, "velMax": 266, "cantPue": 2, "cantRue": 4 },
    { "id": 67, "modelo": "Boeing CH-47 Chinook", "anoFab": 1962, "velMax": 302, "altMax": 6, "autonomia": 1200 },
    { "id": 666, "modelo": "Aprilia RSV 1000 R", "anoFab": 2004, "velMax": 280, "cantPue": 0, "cantRue": 2 },
    { "id": 872, "modelo": "Boeing 747-400", "anoFab": 1989, "velMax": 988, "altMax": 13, "autonomia": 13450 },
    { "id": 742, "modelo": "Cessna CH-1 Skyhook", "anoFab": 1953, "velMax": 174, "altMax": 3, "autonomia": 870 }
];

// Mapeo de los datos a las instancias de las clases
const vehiculos = vehiculosData.map(v => {
    if ('cantPue' in v && 'cantRue' in v) {
        // Retorna una instancia de Terrestre
        return new Terrestre(v.modelo, v.anoFab, v.velMax, v.cantPue, v.cantRue);
    } else if ('autonomia' in v && 'altMax' in v) {
        // Retorna una instancia de Aereo
        return new Aereo(v.modelo, v.anoFab, v.velMax, v.altMax, v.autonomia);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tablaVehiculos = document.getElementById('tabla-vehiculo');
    const filtro = document.getElementById('filtrar');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const abmForm = document.getElementById('abm-form');
    const volverBtn = document.getElementById('volver');
    const promedioVehiculo = document.getElementById('promedio-vehiculo');

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
                <td class="col-cantidad-puertas">${vehiculo.cantdPue || 'N/A'}</td>
                <td class="col-cantidad-ruedas">${vehiculo.cantRue || 'N/A'}</td>
            `;
            tablaVehiculos.appendChild(row);
        });
    };

    // Evento para el cambio del filtro
    filtro.addEventListener('change', MostrarDatos);

    document.getElementById('calcular-btn').addEventListener('click', () => {
        const filtro = document.getElementById('filtro').value;
        const vehiculoFiltrados = vehiculos.filter(v => {
            if(filtro === 'todos') return true;
            if(filtro === 'terrestre') return v.cantRue;
            if(filtro === 'aereo') return v.altMax;
        });

        const promedio = vehiculoFiltrados.reduce((acc, v) => acc + v.velMax, 0) / vehiculoFiltrados.length;
        promedioVehiculo.textContent = `Promedio de Velocidad: ${promedio.toFixed(2)} km/h`;
    });

    // Mostrar/ocultar columnas según checkboxes seleccionados
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
    });

    volverBtn.addEventListener('click', () => {
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
    });

    abmForm.addEventListener('submit', e => { 
        e.preventDefault();

        const id = parseInt(document.getElementById('id').value);
        const modelo = document.getElementById('modelo').value;
        const anioFabricado = parseFloat(document.getElementById('anio-fabricado').value);
        const velocidadMaxima = parseFloat(document.getElementById('velocidad-maxima').value);
        const alturaMaxima = parseFloat(document.getElementById('altura-maxima').value);
        const autonomia = parseInt(document.getElementById('autonomia').value);
        const cantidadPuertas = parseInt(document.getElementById('cantidad-puertas').value);
        const cantidadRuedas = parseInt(document.getElementById('cantidad-ruedas').value);
        
        let nuevoVehiculo;
    });

    MostrarDatos();
});
