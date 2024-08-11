const apiUrl = 'http://localhost:3000/api'


const getInmuebles = () => {

    axios.get(`${apiUrl}/inmuebles/inmuebles_lista`)
        .then(response => {
            console.log(response.data)

            const inmueblesList = document.getElementById('inmuebles-lista')
            inmueblesList.innerHTML = response.data.map(inmueble =>
                `<li>${inmueble.dir_inmueble}</li>`).join('')
            return inmueblesList
        })
        .catch(error => {
            console.error('Error al obtener inmuebles:', error)
            return error
        })
}

const getClientes = () => {

    axios.get(`${apiUrl}/clientes/clientes_lista`)
        .then(response => {
            console.log(response.data)

            const clientesList = document.getElementById('clientes-lista')
            clientesList.innerHTML = response.data.map(cliente =>
                `<li>${cliente.nom_cliente}</li>`).join('')
            return clientesList
        })
        .catch(error => {
            console.error('Error al obtener clientes:', error)
            return error
        })
}


window.api = {
    getInmuebles,
    getClientes
}