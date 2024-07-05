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
    calendarcodRef,
    buscarProp_Disponible,
    idInmueble_codRef,
    guardarContrato
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
        const f_ini = req.params.f_ini
        const f_fin = req.params.f_fin

        const _buscarProp_Disponible = await buscarProp_Disponible(0, f_ini, f_fin)
        console.log(_buscarProp_Disponible)
        res.json(_buscarProp_Disponible)

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
        const {
            start,
            end,
            cantidadDeDias,
            cod_referencia
        } = req.body

        console.log('Data de admissão:', start)
        console.log('Data final:', end)
        console.log('Dias:', cantidadDeDias)

        const hoy = new Date()
        const yyyy = hoy.getFullYear()
        const mm = String(hoy.getMonth() + 1).padStart(2, '0')
        const dd = String(hoy.getDate()).padStart(2, '0')

        const fechaFormateada_DeHoy = `${yyyy}-${mm}-${dd}`

        const idInmueble = await idInmueble_codRef(cod_referencia)
        console.log(idInmueble)

        const nuevoContrato = {
            tipo_operacion: 'Alquiler',
            fecha_ing: start,
            fecha_salida: end,
            cant_dias: cantidadDeDias,
            cliente_id: 1,
            valor_total: '0',
            monto_reserva: '0',
            fecha_reserva: fechaFormateada_DeHoy,
            datos_envio: 'A cuenta de Propietario',
            inmueble_id: idInmueble[0].dataValues.id_inmueble
        }

        console.log(nuevoContrato)

        const result = await guardarContrato(nuevoContrato)
        return res.status(200).json({
            ok: result
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