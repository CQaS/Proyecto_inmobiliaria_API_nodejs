import {
    Router
} from "express"
import {
    exclusivos,
    inmuebles_crear
} from "../controllers/inmuebles.controllers.js"
import {
    validarInmueble
} from "../middleware/validarInmueble.middleware.js"
import {
    nuevoInmueble
} from "../schemas/inmueble.schemma.js"

const routesInmuebles = Router()

routesInmuebles.get('/inmuebles_exclusivos', exclusivos)
routesInmuebles.post('/inmuebles_crear', validarInmueble(nuevoInmueble), inmuebles_crear)

export default routesInmuebles