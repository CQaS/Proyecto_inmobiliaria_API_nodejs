import {
    Inmueble,
    Fotos_prop
} from '../models/asociacion.js'

const listarExclisivos = async () => {
    await Inmueble.sync()
    return await Inmueble.findAll({
        where: {
            exclusividad: 1
        }
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

const QUERY_SEQUELIZE_INMUEBLES = {
    listarExclisivos,
    detalles
}

export default QUERY_SEQUELIZE_INMUEBLES