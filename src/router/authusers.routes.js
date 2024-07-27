import {
    Router
} from "express"
import {
    Login,
    Logout,
    CrearUser,
    EditarUser,
    EliminarUser,
    ResetPassword
} from "../controllers/authUsers.controllers.js"
import {
    validarSchemmaGenerico
} from "../middleware/validarSchemmaGenerico.middleware.js"
import {
    authUserSchema
} from "../schemas/AuthUsers.schemma.js"
import {
    authRequerido
} from "../middleware/validarToken.middleware.js"

const routesAuthUsers = Router()

routesAuthUsers.post('/login', validarSchemmaGenerico(authUserSchema), Login)
routesAuthUsers.post('/logout', Logout)
routesAuthUsers.post('/crear_user', authRequerido, validarSchemmaGenerico(authUserSchema), CrearUser)
routesAuthUsers.put('/editar_user/:id', authRequerido, validarSchemmaGenerico(authUserSchema), EditarUser)
routesAuthUsers.delete('/eliminar_user/:id', authRequerido, EliminarUser)
routesAuthUsers.post('/reset_password', ResetPassword)

export default routesAuthUsers