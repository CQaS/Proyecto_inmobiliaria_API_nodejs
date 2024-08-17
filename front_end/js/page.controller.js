import {
    getInmuebles,
    getClientes,
    login
} from './api.js';

export const pageFunctions = {
    'inmuebles.html': getInmuebles,
    'clientes.html': getClientes,
    'login': login
}