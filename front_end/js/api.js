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

        catchError(error)

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

        catchError(error)

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

const catchError = (error) => {

    if (error.response.data.Error == 'NO TIENES ACCESSO AUTORIZADO, SIN TOKEN!') {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.Error,
            html: `
                <p>${error.response.data.Error}</p>
                <input type="text" id="useremail" class="swal2-input" placeholder="Username">
                <input type="password" id="password" class="swal2-input" placeholder="Password">
            `,
            confirmButtonText: 'Login',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#useremail').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!username || !password) {
                    Swal.showValidationMessage('Por favor, ingrese ambos campos')
                }
                return {
                    username,
                    password
                }
            }
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const loginResponse = await axios.post(`${apiUrl}/authusers/login`, {
                        username: result.value.username,
                        password: result.value.password
                    }, {
                        withCredentials: true
                    })

                    if (loginResponse.data.ok === 'Login') {

                        _alerta('Se ha iniciado sesión correctamente', 'success')

                        location.reload()
                    }

                } catch (loginError) {

                    _alerta('Error al intentar iniciar sesión. Por favor, verifique sus credenciales.', 'error')
                }
            }
        })

    } else {

        _alerta('Error fetching inmuebles', 'error')
    }

}