export const renderClientes = (data) => {
    const list = document.getElementById('clientes-lista')
    list.innerHTML = data.map(cliente => `
        <li class="p-2 border-b border-gray-200">${cliente.nom_cliente}</li>
        `).join('')
}