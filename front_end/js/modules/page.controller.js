import {
    getExclusivosInmuebles,
    getAllInmuebles,
    getUnInmuebles,
    getClientes,
    getAllEmpleados,
    getUnEmpleado,
    login,
    registro,
    logout,
    validateContactForm
} from './index.js'

export const pageFunctions = {
    'index.html': getAllInmuebles,
    'propiedad-grid.html': getAllInmuebles,
    'blog-grid.html': getExclusivosInmuebles,
    'propiedad-single.html': getUnInmuebles,
    'about.html': getAllEmpleados,
    'agents-grid.html': getAllEmpleados,
    'agent-single.html': getUnEmpleado,
    'contacto.html': validateContactForm,
    'login': login,
    'registro': registro,
    'logout': logout
}