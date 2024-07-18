import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js";
const {
    sequelize
} = SDM

import {
    AuthUsers
} from '../models/asociacion.js'

const consultarUsers = async () => {
    await AuthUsers.sync()
    return await AuthUsers.findAll()
}

const QUERY_SEQUELIZE_AUTHUSERS = {
    consultarUsers
}

export default QUERY_SEQUELIZE_AUTHUSERS