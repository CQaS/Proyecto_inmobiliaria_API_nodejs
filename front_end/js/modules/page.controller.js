import {
    getExclusivosInmuebles,
    getAllInmuebles,
    getUnInmuebles,
    getClientes,
    getEmpleados,
    login,
    registro,
    logout,
    validateContactForm
} from './index.js'

export const pageFunctions = {
    'index.html': getAllInmuebles,
    'propiedad-grid.html': getAllInmuebles,
    'about.html': getEmpleados,
    'blog-grid.html': getExclusivosInmuebles,
    'propiedad-single.html': getUnInmuebles,
    'contacto.html': validateContactForm,
    'login': login,
    'registro': registro,
    'logout': logout
}