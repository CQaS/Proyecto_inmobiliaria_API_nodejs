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
    consultarCodRef,
    reportesJsonI,
    listarInmuebles_tipo_p,
    listarInmuebles_tipo_o,
    listarInmuebles_tipo_o_p,
    listarInmuebles_tipo_o_venta,
    listarInmuebles_tipo_o_p_venta
} = QUERY_SEQUELIZE_INMUEBLES

import QUERY_SEQUELIZE_CONTRATOS from "../querys/querys.contratos.js"
const {
    guardarContrato
} = QUERY_SEQUELIZE_CONTRATOS

import QUERY_SEQUELIZE_CLIENTES from "../querys/querys.clientes.js"
const {
    consultarCliente
} = QUERY_SEQUELIZE_CLIENTES

import QUERY_SEQUELIZE_FOTOSPROP from "../querys/querys.fotosProp.js"
const {
    guardarFotosInmuebleNuevo,
    eliminarFotoDeInmueble
} = QUERY_SEQUELIZE_FOTOSPROP

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
    "cod_referencia": "1qa2ws",
    "condicion": "Nuevo",
    "expensas": true,
    "descripcion": "Hermoso departamento en el centro de la ciudad de Merlo.",
    "clave_puerta_ingreso": "1234",
    "clave_puerta_ingreso2": "5678",
    "clave_wifi": "clave123",
    "tipo_servicio": "WI-FI, Ropa de cama",
    "cliente_id": 1,
    "valor_inmueble": "150000",
    "exclusividad": true,
    "habitac_maxima": 4,
    "latitud": "-34.6037",
    "longitud": "-58.3816",
    "fotos": [
        {
            "image": "foto1.jpg"
        },
        {
            "image": "foto2.jpg"
        }
    ]
} */
    try {
        const {
            fotos,
            imgportada,
            video,
            cod_referencia,
            cliente_id,
            ...nuevoInmueble
        } = req.body

        nuevoInmueble.cod_referencia = cod_referencia
        nuevoInmueble.cliente_id = cliente_id

        const existe_codRef = await consultarCodRef(cod_referencia)

        if (existe_codRef.length > 0) {
            return res.status(404).json({
                Error: `Cod Referencia ya existe: ${cod_referencia}`
            })
        }

        const existe_cliente = await consultarCliente(cliente_id)

        if (existe_cliente == null) {
            return res.status(404).json({
                Error: `ID Cliente no existe: ${cliente_id}`
            })
        }

        const InmuebleGuardado = await guardarInmueble(0, nuevoInmueble)
        let FotosGuardadas = null
        let FotosPortadaGuardada = null
        if (InmuebleGuardado.ok) {

            FotosGuardadas = await guardarFotosInmuebleNuevo(InmuebleGuardado.id_inmueble_nuevo, fotos)
            FotosPortadaGuardada = await guardarFotosInmuebleNuevo(InmuebleGuardado.id_inmueble_nuevo, imgportada)
        }

        if (InmuebleGuardado.ok && FotosGuardadas.ok && FotosPortadaGuardada.ok) {

            return res.status(200).json(InmuebleGuardado)
        }

        if (InmuebleGuardado.Error || FotosGuardadas.Error || FotosPortadaGuardada.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Inmueble y/o Las Fotos!'
            })
        }


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_propiedad = async (req, res) => {
    try {
        const id = req.params.id
        const {
            fotos,
            imgportada,
            video,
            cod_referencia,
            cliente_id,
            ...inmueble_A_Editar
        } = req.body

        inmueble_A_Editar.cod_referencia = cod_referencia
        inmueble_A_Editar.cliente_id = cliente_id

        const el_inmueble = await detalles(id)

        if (el_inmueble == null) {
            return res.status(404).json({
                Error: "Inmueble no encontrado"
            })
        }

        if (cod_referencia !== el_inmueble.cod_referencia) {

            const existe_codRef = await consultarCodRef(cod_referencia)

            if (existe_codRef.length > 0) {
                return res.status(404).json({
                    Error: `Cod Referencia ya existe: ${cod_referencia}`
                })
            }
        }

        const existe_cliente = await consultarCliente(cliente_id)

        if (existe_cliente == null) {
            return res.status(404).json({
                Error: `ID Cliente no existe: ${cliente_id}`
            })
        }

        const InmuebleEditado = await guardarInmueble(id, inmueble_A_Editar)

        let FotosPortadaGuardada = null
        if (imgportada) {
            const resultado = await eliminarFotoDeInmueble(id, true)
            if (resultado.Error) {
                return res.status(404).json({
                    Error: resultado.Error
                })
            }

            FotosPortadaGuardada = await guardarFotosInmuebleNuevo(id, imgportada)
            console.log(`FotosPortadaGuardada ${imgportada}`)
        }
        if (InmuebleEditado.ok && FotosPortadaGuardada.ok) {

            return res.status(200).json(InmuebleEditado)
        }

        if (InmuebleEditado.Error || FotosPortadaGuardada.Error) {

            return res.status(404).json({
                Error: 'Error al Editar el Inmueble y/o Las Fotos!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const inmuebles_lista = async (req, res) => {
    try {
        const _listarInmuebles = await listarInmuebles()
        console.log('_listarInmuebles')
        console.log(_listarInmuebles.length)
        res.json(_listarInmuebles)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
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
            Error: 'Algo fallo'
        })

    }
}

export const inmueble_detalles = async (req, res) => {

    try {
        const id = req.params.id

        let _detalles = await detalles(id)
        _detalles != null ? console.log(_detalles) : _detalles = {
            Error: 'Inmueble no encontrado!'
        }
        res.json(_detalles)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
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
            Error: 'Algo fallo'
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
            Error: 'Algo fallo'
        })

    }
}

export const reportes_json_i = async (req, res) => {
    try {
        const _reportesJsonI = await reportesJsonI()
        console.log(_reportesJsonI)
        res.json(_reportesJsonI)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const propiedad_por_tipo = async (req, res) => {
    try {
        const {
            tipo_o,
            tipo_p,
            f_1,
            f_2
        } = req.query

        console.log(req.query)

        const hoy = new Date();
        let fecha_formateada = hoy.toISOString().split('T')[0]
        let fecha_formateada2 = hoy.toISOString().split('T')[0]

        if (f_1 && f_2) {
            fecha_formateada = f_1
            fecha_formateada2 = f_2
        }

        if (tipo_p && !tipo_o) {

            console.log(`Tipo Operacion = null, Tipo Propiedad = ${tipo_p}`)

            const _listarInmuebles_tipo_p = await listarInmuebles_tipo_p(tipo_p)

            return res.status(200).json({
                count: _listarInmuebles_tipo_p.length,
                ok: _listarInmuebles_tipo_p
            })

        } else if (tipo_o && (tipo_o == 'Alquiler temporario' || tipo_o == 'Alquiler permanente') && !tipo_p) {

            console.log(`Tipo Operacion = ${tipo_o}, Tipo Propiedad = null`)

            const _listarInmuebles_tipo_o = await listarInmuebles_tipo_o(tipo_o, fecha_formateada, fecha_formateada2)

            return res.status(200).json({
                count: _listarInmuebles_tipo_o.length,
                ok: _listarInmuebles_tipo_o
            })

        } else if (tipo_o && (tipo_o == 'Alquiler temporario' || tipo_o == 'Alquiler permanente') && tipo_p) {

            console.log(`Tipo Operacion = ${tipo_o}, Tipo Propiedad = ${tipo_p}`)

            const _listarInmuebles_tipo_o_p = await listarInmuebles_tipo_o_p(tipo_o, tipo_p, fecha_formateada, fecha_formateada2)

            return res.status(200).json({
                count: _listarInmuebles_tipo_o_p.length,
                ok: _listarInmuebles_tipo_o_p
            })

        } else if (tipo_o && tipo_o == 'Venta' && !tipo_p) {

            console.log(`Tipo Operacion = ${tipo_o}, Tipo Propiedad = null`)

            const _listarInmuebles_tipo_o_venta = await listarInmuebles_tipo_o_venta(tipo_o)

            return res.status(200).json({
                count: _listarInmuebles_tipo_o_venta.length,
                ok: _listarInmuebles_tipo_o_venta
            })


        } else if (tipo_o && tipo_o == 'Venta' && tipo_p) {

            console.log(`Tipo Operacion = ${tipo_o}, Tipo Propiedad = ${tipo_p}`)

            const _listarInmuebles_tipo_o_p_venta = await listarInmuebles_tipo_o_p_venta(tipo_o, tipo_p)

            return res.status(200).json({
                count: _listarInmuebles_tipo_o_p_venta.length,
                ok: _listarInmuebles_tipo_o_p_venta
            })

        } else if ((!tipo_p && !tipo_o) && (f_1 && f_2)) {

            console.log(`Tipo Operacion = null, Tipo Propiedad = null - Busca entre fechas: ${fecha_formateada} - ${fecha_formateada2}`)

            const _buscarProp_Disponible = await buscarProp_Disponible(0, fecha_formateada, fecha_formateada2)
            return res.status(200).json({
                count: _buscarProp_Disponible.length,
                ok: _buscarProp_Disponible
            })
        } else if (
            !tipo_o &&
            !tipo_p &&
            !f_1 &&
            !f_2
        ) {
            console.log('Selecciona una busqueda correcta!')
            return res.status(404).json({
                Error: 'Selecciona una busqueda correcta!'
            })
        }

    } catch (err) {

        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
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
            Error: 'Algo fallo'
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
                Error: `Cantidad de dias invalidos: ${cantidadDeDias}`
            })
        }

        if (moment(start, 'YYYY-MM-DD', true).isValid()) {
            null
        } else {
            return res.status(400).json({
                Error: `Fecha de Ingreso inválida: ${start}`
            })
        }

        if (moment(end, 'YYYY-MM-DD', true).isValid()) {
            null
        } else {
            return res.status(400).json({
                Error: `Fecha de Salida inválida: ${end}`
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
                Error: `Codigo de Ref Invalido: ${cod_referencia}`
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
        if (ContratoGuardado.ok) {

            return res.status(200).json({
                inmueble_indisponible: ContratoGuardado
            })
        }

        if (ContratoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Contrato!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
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
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_propiedad = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarPropiedad(id)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminarfotosporinmueble = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarFotoDeInmueble(id, false)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}