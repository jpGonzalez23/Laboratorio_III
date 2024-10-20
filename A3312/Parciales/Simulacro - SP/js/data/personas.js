import { Empleado } from '../models/Empleado.js';
import { Cliente } from "../models/Cliente.js";
import { data } from "./data.js";

export const personas = data.map(p => {
    if ('ventas' in p && 'sueldo' in p) {
        return new Empleado(p.id, p.nombre, p.apellido, p.edad, p.sueldo, p.ventas);
    } else if ('compras' in p && 'telefono' in p) {
        return new Cliente(p.id, p.nombre, p.apellido, p.edad, p.compras, p.telefono);
    }
})