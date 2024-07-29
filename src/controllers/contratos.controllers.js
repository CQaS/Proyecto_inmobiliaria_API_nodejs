import QUERY_SEQUELIZE_CONTRATOS from "../querys/querys.contratos.js"
const {
    guardarContrato,
    con_Detalles,
    reportesJsonT
} = QUERY_SEQUELIZE_CONTRATOS
import QUERY_SEQUELIZE_CLIENTES from "../querys/querys.clientes.js"
const {
    consultarCliente
} = QUERY_SEQUELIZE_CLIENTES
import QUERY_SEQUELIZE_INMUEBLES from "../querys/querys.inmuebles.js"
const {
    detalles,
    contratoCodRef2,
    buscarProp_Disponible
} = QUERY_SEQUELIZE_INMUEBLES

export const contrato_CodRef = async (req, res) => {
    try {

        res.json({
            ok: true
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const contrato_CodRef2 = async (req, res) => {
    try {

        const codRef = req.params.codRef

        const resultado_codRef = await contratoCodRef2(codRef)

        if (resultado_codRef == null) {
            return res.status(404).json({
                Error: `Inmueble con el Codigo de Ref: ${codRef} no existe!`
            })
        }

        console.log(resultado_codRef)

        res.json({
            ok: 'Inmueble Encontrado!',
            data: resultado_codRef
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const contratar = async (req, res) => {
    try {

        const inmueble_id = req.params.inmueble_id

        const el_inmueble_a_contratar = await detalles(inmueble_id)
        if (el_inmueble_a_contratar == null) {
            return res.status(500).json({
                Error: `Inmueble con ID: ${inmueble_id} no encontrado!`
            })

        }

        return res.status(200).json({
            ok: 'el inmueble a contratar',
            data: el_inmueble_a_contratar
        })


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const conDetalles = async (req, res) => {
    try {

        const id_contrato = req.params.id_contrato

        const el_detalle = await con_Detalles(id_contrato)
        if (el_detalle.length == 0) {
            return res.status(500).json({
                Error: `Contrato con ID: ${id_contrato} no encontrado!`
            })

        }

        return res.status(200).json(el_detalle)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const verificarFechas = async (req, res) => {
    try {
        console.log(req.query)
        const {
            id_inmueble,
            fecha_in,
            fecha_sal
        } = req.query

        const _buscarProp_Disponible = await buscarProp_Disponible(id_inmueble, fecha_in, fecha_sal)

        console.log(_buscarProp_Disponible)
        res.json(_buscarProp_Disponible)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crearContrato = async (req, res) => {

    /* {
        "tipo_operacion": "Alquiler",
        "fecha_ing": "2024-07-15",
        "fecha_salida": "2024-07-30",
        "cant_dias": 15,
        "cliente_id": 1,
        "valor_total": "1000",
        "monto_reserva": "200",
        "datos_envio": "Av. Siempre Viva 123, Springfield",
        "inmueble_id": 2
    } */

    try {
        const {
            cliente_id,
            inmueble_id,
            fecha_ing,
            fecha_salida
        } = req.body

        const _buscarProp_Disponible = await buscarProp_Disponible(inmueble_id, fecha_ing, fecha_salida)

        if (_buscarProp_Disponible.resultado == 1) {

            const existeCliente = await consultarCliente(cliente_id)
            console.log(existeCliente)

            if (existeCliente == null) {
                return res.status(404).json({
                    Error: `Cliente no existe: ${cliente_id}`
                })
            }

            let _detalles = await detalles(inmueble_id)
            console.log(_detalles)

            if (_detalles == null) {
                return res.status(404).json({
                    Error: `Inmueble ID: ${inmueble_id} no encontrado!`
                })
            }

            const hoy = new Date();
            const formatHoy = hoy.toISOString().split('T')[0]


            let contratoAguardar = req.body

            contratoAguardar.fecha_contrato == undefined ? contratoAguardar.fecha_contrato = formatHoy : null
            contratoAguardar.fecha_reserva == undefined ? contratoAguardar.fecha_reserva = formatHoy : null

            const ContratoGuardado = await guardarContrato(contratoAguardar)

            if (ContratoGuardado.ok) {

                return res.status(200).json(ContratoGuardado)
            }

            if (ContratoGuardado.Error) {

                return res.status(404).json({
                    Error: 'Error al guardar el Contrato!'
                })
            }

        } else {

            return res.status(404).json({
                Error: _buscarProp_Disponible.ok
            })

        }



    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const reportes_json_t = async (req, res) => {
    try {

        const _reportesJsonT = await reportesJsonT()
        console.log(_reportesJsonT)
        res.json(_reportesJsonT)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}