import {
    Router
} from "express"
import {
    Login,
    Logout,
    CrearUser,
    EditarUser,
    EliminarUser
} from "../controllers/authUsers.controllers.js"
import {
    validarSchemmaGenerico
} from "../middleware/validarSchemmaGenerico.middleware.js"
import {
    authUserSchema
} from "../schemas/AuthUsers.schemma.js"

const routesAuthUsers = Router()

routesAuthUsers.post('/login', validarSchemmaGenerico(authUserSchema), Login)
routesAuthUsers.post('/logout', Logout)
routesAuthUsers.post('/crear_user', validarSchemmaGenerico(authUserSchema), CrearUser)
routesAuthUsers.put('/editar_user/:id', validarSchemmaGenerico(authUserSchema), EditarUser)
routesAuthUsers.delete('/eliminar_user/:id', EliminarUser)

export default routesAuthUsers