import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'
import SDM from "../db/sequelize_db.js"
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
        const contratoGuardado = await Contrato.create(datosContrato)
        console.log('Contrato guardado:', contratoGuardado)

        return {
            ok: "Contrato nuevo guardado con Exito!",
            data: contratoGuardado
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al guardar el contrato:', error)
            return {
                Error: error
            }
        }
    }
}

const con_Detalles = async (id_contrato) => {
    try {
        const contratoDetalle = await sequelize.query(`
        SELECT * , DATE_FORMAT(c.fecha_contrato, 'YYYY-MM-DD') as fecha_contrato, DATE_FORMAT(c.fecha_ing, 'YYYY-MM-DD') as fecha_ing, DATE_FORMAT(c.fecha_salida, 'YYYY-MM-DD') as fecha_salida, DATE_FORMAT(c.fecha_reserva, 'YYYY-MM-DD') as fecha_reserva FROM contrato c JOIN fotos_prop f ON c.inmueble_id = f.inmueble_id JOIN inmueble i ON c.inmueble_id = i.id_inmueble WHERE c.id_contrato = :id_contrato
        `, {
            replacements: {
                id_contrato
            },
            type: SequelizeLib.QueryTypes.SELECT
        })

        console.log('Contrato:', contratoDetalle)

        return contratoDetalle

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al buscar el contrato:', error)
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_CONTRATOS = {
    guardarContrato,
    con_Detalles
}

export default QUERY_SEQUELIZE_CONTRATOS