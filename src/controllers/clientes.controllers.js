import QUERY_SEQUELIZE_CLIENTES from "../querys/querys.clientes.js"
const {
    consultarCliente,
    listarClientes,
    clienteLocDni,
    clienteLocNombre,
    clientePropNombre,
    eliminarCliente
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
    try {
        res.status(200).json({
            ok: 'crear_cliente'
        })

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
        res.status(200).json({
            ok: `editar_cliente ${id}`
        })

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