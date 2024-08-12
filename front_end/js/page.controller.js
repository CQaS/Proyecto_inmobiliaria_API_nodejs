import {
    getInmuebles,
    getClientes
} from './api.js';

export const pageFunctions = {
    'inmuebles.html': getInmuebles,
    'clientes.html': getClientes,
}