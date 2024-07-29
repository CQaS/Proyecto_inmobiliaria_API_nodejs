import QUERY_SEQUELIZE_CLIENTES from "../querys/querys.clientes.js"
const {
    consultarCliente,
    consultarDni,
    consultarRG,
    consultarEmail,
    listarClientes,
    clienteLocDni,
    clienteLocNombre,
    clientePropNombre,
    guardarCliente,
    reciboCliente,
    eliminarCliente,
    reportesJsonC,
    reportesJsonP
} = QUERY_SEQUELIZE_CLIENTES

export const clientes_lista = async (req, res) => {
    try {
        const _listarClientes = await listarClientes()
        console.log(_listarClientes)
        console.log(_listarClientes.length)
        res.json(_listarClientes)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_cliente = async (req, res) => {

    /* {
        "nom_cliente": "Juan Perez",
        "dni_cliente": 12345678,
        "rg_cliente": "123456789",
        "dir_cliente": "Av. Siempre Viva 123",
        "tel_cliente": 1122334455,
        "email_cliente": "juan.perez@example.com",
        "ciudad_cliente": "Buenos Aires",
        "pais_cliente": "Argentina",
        "fechnac": "2020-01-01",
        "categoria": "Locatario"
    } */


    try {
        const {
            dni_cliente,
            rg_cliente,
            email_cliente
        } = req.body

        const existeDNI = await consultarDni(dni_cliente)
        console.log(existeDNI)

        if (existeDNI != null) {
            return res.status(404).json({
                Error: `DNI ya existe: ${dni_cliente}`
            })
        }

        const existeRG = await consultarRG(rg_cliente)

        if (existeRG.length > 0) {
            return res.status(404).json({
                Error: `RG ya existe: ${rg_cliente}`
            })
        }

        const existeEmail = await consultarEmail(email_cliente)

        if (existeEmail.length > 0) {
            return res.status(404).json({
                Error: `Email ya existe: ${email_cliente}`
            })
        }

        const ClienteGuardado = await guardarCliente(0, req.body)

        if (ClienteGuardado.ok) {

            return res.status(200).json(ClienteGuardado)
        }

        if (ClienteGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Cliente!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_cliente = async (req, res) => {
    try {
        const id = req.params.id
        const {
            dni_cliente,
            rg_cliente,
            email_cliente
        } = req.body

        const el_cliente = await consultarCliente(id)
        if (el_cliente == null) {
            return res.status(404).json({
                Error: "Cliente no encontrado"
            })
        }

        if (dni_cliente != el_cliente.dni_cliente) {
            const existeDNI = await consultarDni(dni_cliente)
            console.log(existeDNI)

            if (existeDNI.length > 0) {
                return res.status(404).json({
                    Error: `DNI ya existe: ${dni_cliente}`
                })
            }
        }

        if (rg_cliente != el_cliente.rg_cliente) {
            const existeRG = await consultarRG(rg_cliente)

            if (existeRG.length > 0) {
                return res.status(404).json({
                    Error: `RG ya existe: ${rg_cliente}`
                })
            }
        }

        if (email_cliente != el_cliente.email_cliente) {
            const existeEmail = await consultarEmail(email_cliente)

            if (existeEmail.length > 0) {
                return res.status(404).json({
                    Error: `Email ya existe: ${email_cliente}`
                })
            }
        }

        const ClienteGuardado = await guardarCliente(id, req.body)

        if (ClienteGuardado.ok) {

            return res.status(200).json(ClienteGuardado)
        }

        if (ClienteGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Cliente!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const recibo_cliente = async (req, res) => {
    try {
        const id = req.params.id
        const res_reciboDelCliente = await reciboCliente(id)
        console.log(res_reciboDelCliente.length)
        console.log(res_reciboDelCliente)
        res.status(200).json({
            ok: `recibo_cliente ${id}`
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const cliente_loc_nombre = async (req, res) => {
    try {
        const nombre = req.params.nombre
        let _clientelocnombre = await clienteLocNombre(nombre)
        _clientelocnombre != null ? console.log(_clientelocnombre) : _clientelocnombre = {
            Error: 'Cliente no encontrado!'
        }
        res.json(_clientelocnombre)


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const cliente_loc_dni = async (req, res) => {
    try {
        const dni = req.params.dni
        let _clientelocdni = await clienteLocDni(dni)
        _clientelocdni != null ? console.log(_clientelocdni) : _clientelocdni = {
            Error: 'Cliente no encontrado!'
        }
        res.json(_clientelocdni)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const cliente_prop_nombre = async (req, res) => {
    try {
        const nombre = req.params.nombre
        let _clientepropnombre = await clientePropNombre(nombre)
        _clientepropnombre != null ? console.log(_clientepropnombre) : _clientepropnombre = {
            Error: 'Cliente no encontrado!'
        }
        res.json(_clientepropnombre)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const reportes_json_c = async (req, res) => {
    try {
        const _reportesJsonC = await reportesJsonC()
        console.log(_reportesJsonC)
        res.json(_reportesJsonC)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const reportes_json_p = async (req, res) => {
    try {
        const _reportesJsonP = await reportesJsonP()
        console.log(_reportesJsonP)
        res.json(_reportesJsonP)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_cliente = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarCliente(id)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}