import {
    renderInmuebles,
    renderClientes
} from './render.js'

const apiUrl = 'http://localhost:3000/api'

//////ALERTAS////////

const _alerta = (texto, icon) => {

    const iconosPermitidos = ['success', 'error', 'warning', 'info', 'question']
    const iconTipo = iconosPermitidos.includes(icon) ? icon : 'info'

    Swal.fire({
        icon: iconTipo,
        title: 'Alerta',
        text: `${texto}`
    })
}

export const getInmuebles = async () => {
    try {
        const response = await axios.get(`${apiUrl}/inmuebles/inmuebles_lista`)
        renderInmuebles(response.data)

    } catch (error) {
        _alerta('Error fetching inmuebles:', 'error')
        throw error
    }
}

export const getClientes = async () => {
    try {
        const response = await axios.get(`${apiUrl}/clientes/clientes_lista`)
        renderClientes(response.data)

    } catch (error) {
        _alerta('Error fetching clientes:', 'error')
        throw error
    }
}