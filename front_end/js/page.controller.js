import {
    getInmuebles,
    getClientes,
    login,
    registro,
    logout
} from './api.js';

export const pageFunctions = {
    'inmuebles.html': getInmuebles,
    'clientes.html': getClientes,
    'login': login,
    'registro': registro,
    'logout': logout
}