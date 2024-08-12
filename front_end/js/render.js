export const renderInmuebles = (data) => {
    const list = document.getElementById('inmuebles-lista');
    list.innerHTML = data.map(inmueble => `
        <li class="p-2 border-b border-gray-200">${inmueble.dir_inmueble}</li>
    `).join('');
}

export const renderClientes = (data) => {
    const list = document.getElementById('clientes-lista');
    list.innerHTML = data.map(cliente => `
        <li class="p-2 border-b border-gray-200">${cliente.nom_cliente}</li>
    `).join('');
}