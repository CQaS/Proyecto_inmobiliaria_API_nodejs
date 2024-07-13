import {
    Op,
    Sequelize as SequelizeLib,
} from 'sequelize'
import {
    v4 as uuidv4
} from 'uuid'
import path from 'path'

import SDM from "../db/sequelize_db.js";
const {
    sequelize
} = SDM

import {
    Inmueble,
    Fotos_prop,
    Contrato
} from '../models/asociacion.js'

const guardarFotosInmuebleNuevo = async (id, fotosVideo) => {
    try {
        const validarExtensionImagen = (ext) => {
            const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
            return extensionesValidas.includes(ext)
        }

        if (fotosVideo && fotosVideo.length > 0 && Array.isArray(fotosVideo)) {
            for (const foto of fotosVideo) {
                const extension = path.extname(foto.image)
                if (typeof foto.image === 'string' && validarExtensionImagen(extension)) {
                    const nombreUnico = `${uuidv4()}${extension}`

                    const fotoNueva = await Fotos_prop.create({
                        image: nombreUnico,
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

            console.log('Fotos Guardadas con Exito')
            return {
                ok: 'Fotos Guardadas con Existos!'
            }

        } else {
            const extension = path.extname(fotosVideo)
            if (validarExtensionImagen(extension)) {
                const nombreUnico = `PORTADA_${uuidv4()}${extension}`

                const fotoNueva = await Fotos_prop.create({
                    image: nombreUnico,
                    inmueble_id: id
                });
                console.log(`ID_Foto_nueva_Portada: ${fotoNueva.id_foto}`)

            } else {
                console.error(`Formato de foto Portada inválida: ${fotosVideo}`);
                return {
                    Error: `Formato de foto Portada inválida: ${fotosVideo}`
                }
            }

            console.log('Foto Portada Guardada con Exito')
            return {
                ok: 'Foto Portada Guardada con Existos!'
            }
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

const eliminarFotoDeInmueble = async (id, portada) => {
    try {

        let F = null
        if (portada) {

            F = await Fotos_prop.findOne({
                where: {
                    inmueble_id: id,
                    image: {
                        [Op.like]: '%PORTADA%'
                    }
                }
            })

        } else {

            F = await Fotos_prop.findByPk(id)
        }

        if (!F) {
            return {
                Error: 'Foto no encontrada'
            }
        }

        await F.destroy();
        console.log(`Foto ${id} Eliminada`)

        return {
            ok: `Foto ${id} Eliminada`,
            data: F
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
            console.error('Error al eliminar el inmueble:', error);
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_FOTOSPROP = {
    guardarFotosInmuebleNuevo,
    eliminarFotoDeInmueble
}

export default QUERY_SEQUELIZE_FOTOSPROP