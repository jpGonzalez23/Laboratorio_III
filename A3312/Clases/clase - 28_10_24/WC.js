class NuevoComponente extends HTMLElement {
    constructor() {
        super();
        let referencia = this.attachShadow({ mode: 'open' });
        this.divCreado = document.createElement('div');
        this.nuevoTitulo = document.createElement('h1');
        this.nuevoTitulo.textContent = "soy un titulo";
        referencia.appendChild(this.divCreado);
        this.divCreado.appendChild(this.nuevoTitulo);
        this.nuevoTitulo.style.color = "red";
    }

    connectedCallback() {
        this.parrafo = document.createElement('p');
        this.parrafo.innerHTML = this.getAttribute('texto');
        this.divCreado.appendChild(this.parrafo);
    }
}

customElements.define('app-nc', NuevoComponente);

class ListarDesdeApi extends HTMLElement {
    constructor() {
        super();
        let referencia = this.attachShadow({ mode: 'open' });
        this.divDos = document.createElement('div');
        this.divTres = document.createElement('div');
        this.subTitulo = document.createElement('h2');
        
        referencia.appendChild(this.divDos);
        this.divDos.appendChild(this.subTitulo);
        referencia.appendChild(this.divTres);
    }

    connectedCallback() {
        // Asigna un valor predeterminado o dinámico al subtítulo, si es necesario.
        this.subTitulo.textContent = "Subtítulo de datos"; 

        this.parrafo = document.createElement('p');
        this.parrafo.innerHTML = this.getAttribute('texto');
        
        let campo = this.getAttribute('campo');
        this.divDos.appendChild(this.parrafo);

        let servicio = this.getAttribute('url');

        // Limpia el contenido anterior para evitar duplicados
        this.divTres.innerHTML = "";

        fetch(servicio).then(response => response.json())
            .then(json => json.results.forEach(element => {
                this.divTres.innerHTML += element[campo];
                this.divTres.appendChild(document.createElement('br'));
            }))
            .catch(error => console.error('Error al obtener datos de la API:', error));
    }
}

customElements.define('app-listar', ListarDesdeApi);
