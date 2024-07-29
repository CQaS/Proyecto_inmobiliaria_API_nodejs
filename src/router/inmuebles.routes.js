import {
    Router
} from "express"
import {
    buscar_por_fechas,
    calendar_codRef,
    crear_propiedad,
    editar_propiedad,
    eliminar_propiedad,
    eliminarfotosporinmueble,
    exclusivos,
    fotosporinmueble,
    inmueble_detalles,
    inmueble_indisponible,
    inmuebles_lista,
    json_liquidacion,
    propiedad_por_tipo,
    reportes_json_i
} from "../controllers/inmuebles.controllers.js"
import {
    validarSchemmaGenerico
} from "../middleware/validarSchemmaGenerico.middleware.js"
import {
    inmuebleSchemma
} from "../schemas/inmueble.schemma.js"

const routesInmuebles = Router()

routesInmuebles.get('/inmuebles_lista', inmuebles_lista)
routesInmuebles.get('/inmuebles_exclusivos', exclusivos)
routesInmuebles.get('/inmueble_detalles/:id', inmueble_detalles)
routesInmuebles.get('/fotosporinmueble/:id', fotosporinmueble)
routesInmuebles.get('/buscar_por_fechas/:f_ini/:f_fin', buscar_por_fechas)
routesInmuebles.get('/propiedad_por_tipo', propiedad_por_tipo)
routesInmuebles.get('/json_liquidacion/:id_p', json_liquidacion)
routesInmuebles.get('/calendar_codRef/:cod_ref', calendar_codRef)
routesInmuebles.get('/inmueble_indisponible', inmueble_indisponible)
routesInmuebles.get('/reportes_json_i', reportes_json_i)
routesInmuebles.post('/crear_propiedad', validarSchemmaGenerico(inmuebleSchemma), crear_propiedad)
routesInmuebles.put('/editar_propiedad/:id', validarSchemmaGenerico(inmuebleSchemma), editar_propiedad)
routesInmuebles.put('/eliminar_propiedad/:id', eliminar_propiedad)
routesInmuebles.delete('/eliminarfotosporinmueble/:id', eliminarfotosporinmueble)

export default routesInmuebles