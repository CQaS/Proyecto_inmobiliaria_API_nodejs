import {
    Op,
    Sequelize
} from 'sequelize'
import SDM from "../db/sequelize_db.js";
const {
    sequelize
} = SDM
import {
    Inmueble,
    Fotos_prop,
    Contrato
} from '../models/asociacion.js'

const guardarContrato = async (datosContrato) => {
    try {
        const contratoGuardado = await Contrato.create(datosContrato);
        console.log('Contrato guardado:', contratoGuardado)
        return contratoGuardado

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
            console.error('Error al guardar el contrato:', error);
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_CONTRATOS = {
    guardarContrato
}

export default QUERY_SEQUELIZE_CONTRATOS