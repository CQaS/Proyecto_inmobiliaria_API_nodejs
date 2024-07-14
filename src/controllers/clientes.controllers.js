import QUERY_SEQUELIZE_CLIENTES from "../querys/querys.clientes.js"
const {
    consultarCliente,
    listarClientes
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

export const eliminar_cliente = async (req, res) => {
    try {
        const id = req.params.id
        res.status(200).json({
            ok: `eliminar_cliente ${id}`
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
        res.status(200).json({
            ok: `cliente_inq_nombre ${nombre}`
        })

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
        res.status(200).json({
            ok: `cliente_inq_dni ${dni}`
        })

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
        res.status(200).json({
            ok: `cliente_prop_nombre ${nombre}`
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}