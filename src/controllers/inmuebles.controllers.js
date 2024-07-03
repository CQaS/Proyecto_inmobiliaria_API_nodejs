/* import mysqlCon from "../db/mysql_DB.js" */

/* export const exclusivos = (req, res) => {
    const sql = 'SELECT * FROM inmueble'

    try {
        mysqlCon.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    err: 'Algo fallo'
                    })
                    }
                    res.json(result)
                    })
                    
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
            })
            
            }
            } */

/* export const inmuebles_crear = (req, res) => {
 const sql = ''
 
 try {
     mysqlCon.query(sql, (err, result) => {
         if (err) {
     console.error(err)
     return res.status(500).json({
         err: 'Algo fallo'
     })
 }
 res.json(result)
 })
 
 } catch (err) {
     console.error(err)
     return res.status(500).json({
 err: 'Algo fallo'
 })
 
 }
 } */

import QUERY_SEQUELIZE_INMUEBLES from "../querys/querys.inmuebles.js"
const {
    listarInmuebles,
    listarExclusivos,
    detalles,
    fotospor_inmueble,
    jsonliquidacion,
    calendarcodRef
} = QUERY_SEQUELIZE_INMUEBLES

export const crear_propiedad = async (req, res) => {
    try {
        res.json({
            crear_propiedad: 'crear_propiedad'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const editar_propiedad = async (req, res) => {
    try {
        res.json({
            editar_propiedad: 'editar_propiedad'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const eliminar_propiedad = async (req, res) => {
    try {
        res.json({
            eliminar_propiedad: 'eliminar_propiedad'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const inmuebles_lista = async (req, res) => {
    try {
        const _listarInmuebles = await listarInmuebles()
        console.log(_listarInmuebles)
        console.log(_listarInmuebles.length)
        res.json(_listarInmuebles)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const exclusivos = async (req, res) => {
    try {

        const _listarExclusivos = await listarExclusivos()
        console.log(_listarExclusivos.length)
        console.log(_listarExclusivos)
        res.json(_listarExclusivos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const inmueble_detalles = async (req, res) => {

    try {
        const id = req.params.id

        const _detalles = await detalles(id)
        console.log(_detalles.length)
        console.log(_detalles)
        res.json(_detalles)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const fotosporinmueble = async (req, res) => {
    try {
        const id = req.params.id

        const _fotosporinmueble = await fotospor_inmueble(id)
        console.log(_fotosporinmueble.length)
        console.log(_fotosporinmueble)
        res.json(_fotosporinmueble)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const eliminarfotosporinmueble = async (req, res) => {
    try {
        res.json({
            eliminarfotosporinmueble: 'eliminarfotosporinmueble'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const buscar_por_fechas = async (req, res) => {
    try {
        res.json({
            buscar_por_fechas: 'buscar_por_fechas'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const propiedad_por_tipo = async (req, res) => {
    try {
        res.json({
            propiedad_por_tipo: 'propiedad_por_tipo'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const json_liquidacion = async (req, res) => {
    try {
        const id_p = req.params.id_p

        const _jsonliquidacion = await jsonliquidacion(id_p)
        console.log(_jsonliquidacion.length)
        console.log(_jsonliquidacion)
        res.json(_jsonliquidacion)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const inmueble_indisponible = async (req, res) => {
    try {
        res.json({
            inmueble_indisponible: 'inmueble_indisponible'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const calendar_codRef = async (req, res) => {
    try {

        const cod_ref = req.params.cod_ref

        const _calendarcodRef = await calendarcodRef(cod_ref)
        console.log(_calendarcodRef.length)
        console.log(_calendarcodRef)
        res.json(_calendarcodRef)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}