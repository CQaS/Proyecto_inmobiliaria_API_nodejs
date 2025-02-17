import {
    _alerta,
    renderExclusivosInmuebles,
    renderAllInmuebles,
    renderUnInmuebles,
    renderClientes,
    renderEmpleados,
    renderUnEmpleado
} from './index.js'

const apiUrl = 'http://localhost:3000/api'

export const getExclusivosInmuebles = async () => {

    try {

        const response = await axios.get(`${apiUrl}/inmuebles/inmuebles_exclusivos`, {
            withCredentials: true
        })
        renderExclusivosInmuebles(response.data)

    } catch (error) {
        console.log(error)

        catchError(error, 'inmuebles')

        throw error
    }
}

export const getAllInmuebles = async () => {

    try {

        const response = await axios.get(`${apiUrl}/inmuebles/inmuebles_lista`, {
            withCredentials: true
        })
        await renderAllInmuebles(response.data)

    } catch (error) {
        console.log(error)

        catchError(error, 'inmuebles')

        throw error
    }
}

export const getUnInmuebles = async () => {

    try {

        const params = new URLSearchParams(window.location.search)
        const idUnInmueble = params.get('idUnInmueble')

        const response = await axios.get(`${apiUrl}/inmuebles/inmueble_detalles/${idUnInmueble}`, {
            withCredentials: true
        })

        response.data.Error ? _alerta(response.data.Error, 'error') : renderUnInmuebles(response.data)

    } catch (error) {
        console.log(error)

        catchError(error, 'inmuebles')

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

        catchError(error, 'clientes')

        throw error
    }
}

export const getAllEmpleados = async () => {

    try {

        const response = await axios.get(`${apiUrl}/empleados/empleados_lista`, {
            withCredentials: true
        })
        renderEmpleados(response.data)

    } catch (error) {

        catchError(error, 'clientes')

        throw error
    }
}

export const getUnEmpleado = async () => {

    try {

        let id_empleado = 7

        const response = await axios.get(`${apiUrl}/empleados/empleado_detalle/${id_empleado}`, {
            withCredentials: true
        })

        renderUnEmpleado(response.data)

    } catch (error) {

        catchError(error, 'clientes')

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

export const logout = async () => {
    try {

        const response = await axios.post(`${apiUrl}/authusers/logout`, {
            withCredentials: true
        })

        if (response.data.ok === 'Logout') {

            const retardante = () => {

                window.location.href = 'index.html'

            }

            setTimeout(retardante, 1000)

            //_alerta('Logout exitoso', 'success')

        } else {

            _alerta(response.data.Error, 'error')
        }

    } catch (error) {
        console.error('Error en el login:', error)
        _alerta('Error en el login', 'error')
    }
}

export const registro = async (data) => {
    try {

        console.log(data)

        const response = await axios.post(`${apiUrl}/authusers/crear_user`, data, {
            withCredentials: true
        })

        if (response.data.ok === 'Crear') {

            const retardante = () => {

                window.location.href = 'index.html'

            }

            setTimeout(retardante, 1000)

            //_alerta('Login exitoso', 'success')

        } else {

            _alerta(response.data.Error, 'error')
        }

    } catch (error) {
        console.error('Error en el registro:', error)
        _alerta(`Error en el registro: ${error.response.data.Error}`, 'error')
    }
}

const catchError = (error, page) => {

    if (error.response.data.Error == 'NO TIENES ACCESSO AUTORIZADO, SIN TOKEN!' || error.response.data.Error == 'NO ESTAS ATENTICADO. POR FAVOR INICA SESSION!') {

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

                        window.location.href = `${page}.html`
                    }

                } catch (loginError) {

                    _alerta('Error al intentar iniciar sesión. Por favor, verifique sus credenciales.', 'error')
                }
            }
        })

    } else {
        console.log(error)

        _alerta(`Error: ${error.response.data.Error}`, 'error')
    }

}