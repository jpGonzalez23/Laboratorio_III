const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

let personas = [
    { id: 1, nombre: 'Juan', edad: 30 },
    { id: 2, nombre: 'María', edad: 25 },
    { id: 3, nombre: 'Pedro', edad: 35 }
];

// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 3000);
};

/**
 * Obtiene todas las Personas
 */
app.get('/personas', simulateDelay, (req, res) => {
    res.json(personas);
});

/**
 * Crea una nueva Persona
 */
app.post('/personas', simulateDelay, (req, res) => {
    const nuevaPersona = req.body;
    nuevaPersona.id = personas.length + 1;
    personas.push(nuevaPersona);
    res.status(200).json(nuevaPersona);
});

/**
 * Obtiene Persona por ID
 */
app.get('/personas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const persona = personas.find(p => p.id === id);
    if (persona) {
        res.json(persona);
    } else {
        res.status(404).send('Persona no encontrada');
    }
});

/**
 * Edita Persona por ID
 */
app.put('/personas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = personas.findIndex(p => p.id === id);
    if (index !== -1) {
        const newObj = req.body;
        newObj.id = id;
        personas[index] = newObj;
        
        res.json(newObj);
    } else {
        res.status(404).send('Persona no encontrada');
    }
});

/**
 * Elimina Persona por ID
 */
app.delete('/personas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = personas.findIndex(p => p.id === id);
    if (index !== -1) {
        personas.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Persona no encontrada');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
