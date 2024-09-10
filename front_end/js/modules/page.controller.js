import {
    getInmuebles,
    getClientes,
    getEmpleados,
    login,
    registro,
    logout,
    validateContactForm
} from './index.js'

export const pageFunctions = {
    'index.html': getInmuebles,
    'about.html': getEmpleados,
    'contacto.html': validateContactForm,
    'login': login,
    'registro': registro,
    'logout': logout
}