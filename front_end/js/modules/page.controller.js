import {
    getInmuebles,
    getClientes,
    getEmpleados,
    login,
    registro,
    logout
} from './api.js'

export const pageFunctions = {
    'index.html': getInmuebles,
    'about.html': getEmpleados,
    'login': login,
    'registro': registro,
    'logout': logout
}