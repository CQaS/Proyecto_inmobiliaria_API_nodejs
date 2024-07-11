import {
    Op,
    Sequelize as SequelizeLib
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

const guardarFotosInmuebleNuevo = async (id, fotos) => {
    try {
        if (fotos && fotos.length > 0) {
            for (const foto of fotos) {
                if (typeof foto.image === 'string') {
                    const fotoNueva = await Fotos_prop.create({
                        image: foto.image,
                        inmueble_id: id
                    });
                    console.log(`ID_Foto_nueva: ${fotoNueva.id_foto}`)

                } else {
                    console.error('Formato de foto inválido:', foto.image);
                    return {
                        Error: `Formato de foto inválido: ${foto}`
                    }
                }
            }
        }
        console.log('Fotos Guardadas con Exito')
        return {
            ok: 'Fotos creadas existosamente!'
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
            console.error('Error al guardar Las fotos:', error);
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_FOTOSPROP = {
    guardarFotosInmuebleNuevo
}

export default QUERY_SEQUELIZE_FOTOSPROP