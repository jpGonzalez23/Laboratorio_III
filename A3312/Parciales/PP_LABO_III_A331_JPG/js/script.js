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
    const promedioVehiculo = document.getElementById('promedio-vehiculo');
    const calcularPromedio = document.getElementById('calcular-btn'); 

    /**
     * The function `MostrarDatos` filters and displays vehicle data based on a selected filter option.
     */
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
                <td><button onclick="eliminar(${vehiculo.id})">Eliminar</button></td>
            `;
            row.addEventListener('dblclick', () => editarVehiculo(vehiculo));
            tablaVehiculos.appendChild(row);
        });
    };

    // Evento para el cambio del filtro
    filtro.addEventListener('change', MostrarDatos);
    
    calcularPromedio.addEventListener('click', () => {
        const filtradas = vehiculos.filter(v => {
            if (filtro.value === 'todos') return true;
            if (filtro.value === 'terrestre') return v instanceof Terrestre;
            if (filtro.value === 'aereo') return v instanceof Aereo;
        });

        const promedio = filtradas.reduce((acc, v) => acc + v.velMax, 0) / filtradas.length;

        promedioVehiculo.textContent = `Promedio de velocidad: ${promedio.toFixed(2)}`;
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
        
        const id = vehiculos.length + 1;
        const modelo = document.getElementById('modelo').value;
        const anoFab = parseInt(document.getElementById('anio-fabricado').value);
        const velMax = parseInt(document.getElementById('velocidad-maxima').value);
        const altMax = document.getElementById('altura-maxima').value ? parseInt(document.getElementById('altura-maxima').value) : null;
        const autonomia = document.getElementById('autonomia').value ? parseInt(document.getElementById('autonomia').value) : null;
        const cantdPue = document.getElementById('cantidad-puertas').value ? parseInt(document.getElementById('cantidad-puertas').value) : null;
        const cantRue = document.getElementById('cantidad-ruedas').value ? parseInt(document.getElementById('cantidad-ruedas').value) : null;
    
        let nVehiculo;
    
        const tipo = document.getElementById('tipo').value; 
    
        if (tipo === 'terrestre') {
            nVehiculo = new Terrestre(id, modelo, anoFab, velMax, cantdPue, cantRue);
        } else if (tipo === 'aereo') {
            nVehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
        }
        else {
            alert('Debe seleccionar un tipo de vehículo');
        }
    
        vehiculos.push(nVehiculo);
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
        
        MostrarDatos();
    });
    

    function editarVehiculo(vehiculo) {
        formDatos.style.display = 'none';
        formAbm.style.display = 'block';

        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('anio-fabricado').value = vehiculo.anoFab;
        document.getElementById('velocidad-maxima').value = vehiculo.velMax;

        if(vehiculo instanceof Aereo) {
            document.getElementById('altura-maxima').value = '';
            document.getElementById('autonomia').value = '';
            document.getElementById('cantidad-puertas').style.display = 'none';
            document.getElementById('cantidad-ruedas').style.display = 'none';
            document.getElementById('altura-maxima').value = vehiculo.altMax;
            document.getElementById('autonomia').value = vehiculo.autonomia;
        } else if (vehiculo instanceof Terrestre) {
            document.getElementById('cantidad-puertas').value = '';
            document.getElementById('cantidad-ruedas').value = '';
            document.getElementById('altura-maxima').style.display = 'none';
            document.getElementById('autonomia').style.display = 'none';
            document.getAnimations('cantidad-puertas').value = vehiculo.cantdPue;
            document.getElementById('cantidad-ruedas').value = vehiculo.cantRue;
        }
    }

    MostrarDatos();
});
