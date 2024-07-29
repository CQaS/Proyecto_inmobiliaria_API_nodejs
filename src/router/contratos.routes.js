import {
    Router
} from "express"
import {
    contrato_CodRef,
    contrato_CodRef2,
    contratar,
    conDetalles,
    verificarFechas,
    crearContrato,
    reportes_json_t
} from "../controllers/contratos.controllers.js"
import {
    validarSchemmaGenerico
} from "../middleware/validarSchemmaGenerico.middleware.js"
import {
    ContratoSchema
} from "../schemas/contrato.schemma.js"

const routesContratos = Router()

routesContratos.get('/contrato_codRef', contrato_CodRef)
routesContratos.get('/contrato_codRef2/:codRef', contrato_CodRef2)
routesContratos.get('/contratar/:inmueble_id', contratar)
routesContratos.get('/condetalles/:id_contrato', conDetalles)
routesContratos.get('/verificar_fechas', verificarFechas)
routesContratos.get('/reportes_json_t', reportes_json_t)
routesContratos.post('/crear_contrato', validarSchemmaGenerico(ContratoSchema), crearContrato)

export default routesContratos