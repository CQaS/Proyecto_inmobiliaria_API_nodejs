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

const QUERY_SEQUELIZE_CLIENTES = {
    consultarCliente,
    listarClientes
}

export default QUERY_SEQUELIZE_CLIENTES