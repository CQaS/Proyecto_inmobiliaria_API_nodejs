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

const guardarInmueble = async (id, datosInmueble) => {
    try {
        if (id == 0) {

            const inmuebleGuardado = await Inmueble.create(datosInmueble);
            console.log('Inmueble guardado:', inmuebleGuardado)
            return {
                ok: 'Inmueble creado existosamente!',
                data: inmuebleGuardado
            }

        } else {

            const [updatedRows] = await Inmueble.update(datosInmueble, {
                where: {
                    id_inmueble: id
                }
            })

            if (updatedRows === 0) {
                return {
                    Error: 'Inmueble no encontrado'
                }
            }

            return {
                ok: "Inmueble actualizado exitosamente!",
                data: datosInmueble
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
            console.error('Error al guardar el contrato:', error);
            return {
                Error: error
            }
        }
    }
}

const listarInmuebles = async () => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            estado: 1
        },
        include: [{
            model: Fotos_prop,
            as: 'fotos', // Nombre de la asociación
        }]
    })
}

const listarExclusivos = async () => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            exclusividad: 1
        },
        include: [{
            model: Fotos_prop,
            as: 'fotos', // Nombre de la asociación
        }]
    })
}

const detalles = async (id) => {
    await Inmueble.sync()
    return await Inmueble.findOne({
        where: {
            id_inmueble: id
        },
        include: [{
            model: Fotos_prop,
            as: 'fotos', // Nombre de la asociación
        }]
    })
}

const consultarCodRef = async (codRef) => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            cod_referencia: codRef
        }
    })
}

const fotospor_inmueble = async (id) => {
    await Fotos_prop.sync()
    return await Fotos_prop.findAll({
        where: {
            inmueble_id: id,
            image: {
                [Op.and]: [{
                        [Op.notLike]: '%PORTADA%'
                    },
                    {
                        [Op.notRegexp]: '\\.(mp4|avi|mov|mkv)$'
                    }
                ]
            }
        }
    })
}

const jsonliquidacion = async (id) => {
    const R = await sequelize.query(`
        SELECT inm.dir_inmueble, con.valor_total 
        FROM clientes cli 
        JOIN inmueble inm ON cli.id_cliente = inm.cliente_id 
        JOIN contrato con ON con.inmueble_id = inm.id_inmueble 
        WHERE cli.id_cliente = :id
        AND cli.categoria = 'Propietario'
        `, {
        replacements: {
            id
        },
        type: SequelizeLib.QueryTypes.SELECT
    })

    return R
}

const buscarProp_Disponible = async (id_inmueble, fecha_ing, fecha_salida) => {
    const R = await sequelize.query(`
        SELECT DISTINCT i.* FROM inmueble i 
        LEFT JOIN contrato c ON i.id_inmueble = c.inmueble_id 
        AND(c.fecha_salida >= ':fecha_ing' AND c.fecha_ing <= ':fecha_salida') 
        WHERE i.estado = 1 
        AND c.id_contrato IS NULL 
        AND NOT EXISTS(SELECT 1 FROM contrato c2 WHERE c2.inmueble_id = i.id_inmueble AND(c2.fecha_salida >= ':fecha_ing' AND c2.fecha_ing <= ':fecha_salida'))
        `, {
        replacements: {
            fecha_ing,
            fecha_salida
        },
        type: SequelizeLib.QueryTypes.SELECT
    })

    if (id_inmueble != 0) {

        for (const i of R) {

            if (i.id_inmueble === id_inmueble) {
                console.log('SI Esta')
                return {
                    res: 1
                }
            }
        }

        console.log('NO Esta')
        return {
            res: 0
        }

    } else {

        const obtenerFotosInmueble = async (id_inmueble) => {
            return await Fotos_prop.findAll({
                where: {
                    inmueble_id: id_inmueble
                },
                attributes: ['image']
            });
        };

        const construirJsonInmueblesConFotos = async (inmuebles) => {
            const inmueblesConFotos = [];

            for (const inmueble of inmuebles) {
                const fotos = await obtenerFotosInmueble(inmueble.id_inmueble);
                inmueblesConFotos.push({
                    ...inmueble,
                    fotos: fotos.map(foto => foto.image)
                });
            }

            return inmueblesConFotos;
        }

        const inmueblesConFotos = await construirJsonInmueblesConFotos(R)
        return inmueblesConFotos
    }
}

const calendarcodRef = async (cod_ref) => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            cod_referencia: cod_ref
        },
        attributes: ['dir_inmueble'],
        include: [{
            model: Contrato,
            attributes: ['fecha_ing', 'fecha_salida', 'cliente_id']
        }]
    })
}

const idInmueble_codRef = async (cod_ref) => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            cod_referencia: cod_ref
        },
        attributes: ['id_inmueble']
    })
}


const eliminarPropiedad = async (id) => {
    try {
        const inmueble = await Inmueble.findByPk(id)

        if (!inmueble) {
            return {
                Error: 'Inmueble no encontrado'
            }
        }

        inmueble.estado = inmueble.estado === 1 ? 0 : 1
        await inmueble.save()
        console.log(`Inmueble ${id}, actualizado a Estado: ${inmueble.estado}`)

        return {
            ok: `Inmueble ${id}, actualizado a Estado: ${inmueble.estado}`,
            data: inmueble
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

const QUERY_SEQUELIZE_INMUEBLES = {
    guardarInmueble,
    listarInmuebles,
    listarExclusivos,
    detalles,
    fotospor_inmueble,
    jsonliquidacion,
    calendarcodRef,
    buscarProp_Disponible,
    idInmueble_codRef,
    eliminarPropiedad,
    consultarCodRef
}

export default QUERY_SEQUELIZE_INMUEBLES