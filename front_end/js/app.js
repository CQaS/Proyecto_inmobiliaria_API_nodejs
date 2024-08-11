const cargarFunciones = () => {

    const routeHandlers = {
        'inmuebles.html': window.api.getInmuebles,
        'clientes.html': window.api.getClientes,

    }

    const path = window.location.pathname.split('/').pop();
    const handler = routeHandlers[path];

    if (handler) {
        handler()
    } else {
        console.error('No handler found for', path)
    }
}

document.addEventListener('DOMContentLoaded', cargarFunciones)