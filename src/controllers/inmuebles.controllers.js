/* import mysqlCon from "../db/mysql_DB.js" */

/* export const exclusivos = (req, res) => {
    const sql = 'SELECT * FROM inmueble'

    try {
        mysqlCon.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    error 'Algo fallo'
                    })
                    }
                    res.json(result)
                    })
                    
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error 'Algo fallo'
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
         error 'Algo fallo'
     })
 }
 res.json(result)
 })
 
 } catch (err) {
     console.error(err)
     return res.status(500).json({
 error 'Algo fallo'
 })
 
 }
 } */

import moment from "moment"
import QUERY_SEQUELIZE_INMUEBLES from "../querys/querys.inmuebles.js"
const {
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
} = QUERY_SEQUELIZE_INMUEBLES

import QUERY_SEQUELIZE_CONTRATOS from "../querys/querys.contratos.js"
const {
    guardarContrato
} = QUERY_SEQUELIZE_CONTRATOS

export const crear_propiedad = async (req, res) => {
    /* {
        "dir_inmueble": "Los Molles 90",
        "barrio_inmueble": "Centro",
        "bloco_inmueble": "A",
        "ciudad_inmueble": "Buenos Aires",
        "nombre_red": "RedInmueble",
        "num_apto": "101",
        "tipo_inmueble": "Departamento",
        "tipo_operacion": "Venta",
        "sup_total": "100",
        "sup_cubierta": "80",
        "sup_semicub": "20",
        "cant_plantas": 1,
        "cant_dormitorios": 3,
        "cant_banos": 2,
        "cochera": true,
        "cochera_rotativa": false,
        "cod_referencia": "67yu",
        "condicion": "Nuevo",
        "expensas": true,
        "descripcion": "Hermoso departamento en el centro de la ciudad.",
        "clave_puerta_ingreso": "1234",
        "clave_puerta_ingreso2": "5678",
        "clave_wifi": "clave123",
        "tipo_servicio": "SD",
        "cliente_id": 1,
        "valor_inmueble": "150000",
        "exclusividad": true,
        "habitac_maxima": 4,
        "latitud": "-34.6037",
        "longitud": "-58.3816"
    } */
    try {
        const {
            dir_inmueble,
            barrio_inmueble,
            bloco_inmueble,
            ciudad_inmueble,
            nombre_red,
            num_apto,
            tipo_inmueble,
            tipo_operacion,
            sup_total,
            sup_cubierta,
            sup_semicub,
            cant_plantas,
            cant_dormitorios,
            cant_banos,
            cochera,
            cochera_rotativa,
            cod_referencia,
            condicion,
            expensas,
            descripcion,
            clave_puerta_ingreso,
            clave_puerta_ingreso2,
            clave_wifi,
            tipo_servicio,
            cliente_id,
            valor_inmueble,
            exclusividad,
            habitac_maxima,
            latitud,
            longitud
        } = req.body;

        const resultado_codRef = await consultarCodRef(cod_referencia)

        if (resultado_codRef.length) {
            return res.status(404).json({
                error: `Cod Referencia ya existe: ${cod_referencia}`
            })
        }


        const nuevoInmueble = {
            dir_inmueble,
            barrio_inmueble,
            bloco_inmueble,
            ciudad_inmueble,
            nombre_red,
            num_apto,
            tipo_inmueble,
            tipo_operacion,
            sup_total,
            sup_cubierta,
            sup_semicub,
            cant_plantas,
            cant_dormitorios,
            cant_banos,
            cochera,
            cochera_rotativa,
            cod_referencia,
            condicion,
            expensas,
            descripcion,
            clave_puerta_ingreso,
            clave_puerta_ingreso2,
            clave_wifi,
            tipo_servicio,
            cliente_id,
            valor_inmueble,
            exclusividad,
            habitac_maxima,
            latitud,
            longitud
        }

        console.log(nuevoInmueble)

        const InmuebleGuardado = await guardarInmueble(nuevoInmueble)
        return res.status(200).json({
            ok: InmuebleGuardado
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Algo fallo'
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
            error: 'Algo fallo'
        })

    }
}

export const eliminar_propiedad = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarPropiedad(id)
        if (resultado.error) {
            return res.status(404).json({
                error: resultado.error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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
            error: 'Algo fallo'
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


        if (!Number.isInteger(Number(cantidadDeDias)) || cantidadDeDias <= 0) {
            return res.status(400).json({
                error: `Cantidad de dias invalidos: ${cantidadDeDias}`
            })
        }

        if (moment(start, 'YYYY-MM-DD', true).isValid()) {
            null
        } else {
            return res.status(400).json({
                error: `Fecha de Ingreso inválida: ${start}`
            })
        }

        if (moment(end, 'YYYY-MM-DD', true).isValid()) {
            null
        } else {
            return res.status(400).json({
                error: `Fecha de Salida inválida: ${end}`
            })
        }

        console.log('Data de admissão:', start)
        console.log('Data final:', end)
        console.log('Dias:', cantidadDeDias)

        const hoy = new Date()
        const yyyy = hoy.getFullYear()
        const mm = String(hoy.getMonth() + 1).padStart(2, '0')
        const dd = String(hoy.getDate()).padStart(2, '0')

        const fechaFormateada_DeHoy = `${yyyy}-${mm}-${dd}`

        const unInmueble = await idInmueble_codRef(cod_referencia)
        if (unInmueble.length === 0) {
            return res.status(400).json({
                error: `Codigo de Ref Invalido: ${cod_referencia}`
            })
        }
        console.log(unInmueble)

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
            inmueble_id: unInmueble[0].dataValues.id_inmueble
        }

        console.log(nuevoContrato)

        const ContratoGuardado = await guardarContrato(nuevoContrato)
        return res.status(200).json({
            inmueble_indisponible: ContratoGuardado
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Algo fallo'
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
            error: 'Algo fallo'
        })

    }
}