import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js";
const {
    sequelize
} = SDM

import {
    Cliente
} from '../models/asociacion.js'

const consultarCliente = async (id) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            id_cliente: id,
            estado: 1
        }
    })
}

const listarClientes = async () => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            estado: 1
        }
    })
}

const clienteLocDni = async (dni) => {
    await Cliente.sync()
    return await Cliente.findOne({
        where: {
            categoria: 'Locatario',
            dni_cliente: dni,
            estado: 1
        }
    })
}

const clienteLocNombre = async (nombre) => {
    await Cliente.sync()
    return await Cliente.findOne({
        where: {
            categoria: 'Locatario',
            nom_cliente: {
                [Op.like]: `%${nombre}%`
            },
            estado: 1
        }
    })
}

const clientePropNombre = async (nombre) => {
    await Cliente.sync()
    return await Cliente.findOne({
        where: {
            categoria: 'Propietario',
            nom_cliente: {
                [Op.like]: `%${nombre}%`
            },
            estado: 1
        }
    })
}

const eliminarCliente = async (id) => {
    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return {
                Error: 'Cliente no encontrado'
            }
        }

        cliente.estado = cliente.estado === 1 ? 0 : 1
        await cliente.save()
        console.log(`Cliente ${id}, actualizado a Estado: ${cliente.estado}`)

        return {
            ok: `Cliente ${id}, actualizado a Estado: ${cliente.estado}`,
            data: cliente
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error);
            return {
                Error: error
            }
        } else {
            console.error('Error al eliminar el cliente:', error);
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_CLIENTES = {
    consultarCliente,
    listarClientes,
    clienteLocDni,
    clienteLocNombre,
    clientePropNombre,
    eliminarCliente
}

export default QUERY_SEQUELIZE_CLIENTES