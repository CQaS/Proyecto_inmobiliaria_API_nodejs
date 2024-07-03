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
    return await Inmueble.findAll({
        where: {
            id_inmueble: id
        },
        include: [{
            model: Fotos_prop,
            as: 'fotos', // Nombre de la asociación
        }]
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
        type: Sequelize.QueryTypes.SELECT
    })

    return R
}

const calendarcodRef = async (cod_ref) => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            cod_referencia: cod_ref
        },
        include: [{
            model: Contrato
        }]
    })
}

const QUERY_SEQUELIZE_INMUEBLES = {
    listarInmuebles,
    listarExclusivos,
    detalles,
    fotospor_inmueble,
    jsonliquidacion,
    calendarcodRef
}

export default QUERY_SEQUELIZE_INMUEBLES