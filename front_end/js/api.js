import {
    renderInmuebles,
    renderClientes
} from './render.js'

import {
    _alerta
} from './alertas/alerta_swal.js'

const apiUrl = 'http://localhost:3000/api'

export const getInmuebles = async () => {

    try {

        const response = await axios.get(`${apiUrl}/inmuebles/inmuebles_lista`, {
            withCredentials: true
        })
        renderInmuebles(response.data)

    } catch (error) {
        _alerta(`Error fetching inmuebles: ${error}`, 'error')
        throw error
    }
}

export const getClientes = async () => {

    try {

        const response = await axios.get(`${apiUrl}/clientes/clientes_lista`, {
            withCredentials: true
        })
        renderClientes(response.data)

    } catch (error) {

        _alerta('Error fetching clientes:', 'error')
        throw error
    }
}

export const login = async (username, password) => {
    try {

        console.log(username, password)

        const response = await axios.post(`${apiUrl}/authusers/login`, {
            username,
            password
        }, {
            withCredentials: true
        })

        if (response.data.ok === 'Login') {

            const retardante = () => {

                window.location.href = 'inmuebles.html'

            }

            setTimeout(retardante, 1000)

            //_alerta('Login exitoso', 'success')

        } else {

            _alerta(response.data.Error, 'error')
        }

    } catch (error) {
        console.error('Error en el login:', error)
        _alerta('Error en el login', 'error')
    }
}