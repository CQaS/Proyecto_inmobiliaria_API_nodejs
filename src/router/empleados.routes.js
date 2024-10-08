import {
    Router
} from "express"
import {
    empleados_lista,
    crear_empleado,
    editar_empleado,
    empleado_detalle,
    eliminar_empleado,
    reportes_json_e
} from "../controllers/empleados.controllers.js"
import {
    validarSchemmaGenerico
} from "../middleware/validarSchemmaGenerico.middleware.js"
import {
    EmpleadosSchema
} from "../schemas/empleado.schemma.js"

const routesEmpleados = Router()

routesEmpleados.get('/empleados_lista', empleados_lista)
routesEmpleados.get('/recibo_empleado/:id', empleado_detalle)
routesEmpleados.get('/empleado_detalle/:id', empleado_detalle)
routesEmpleados.get('/reportes_json_e', reportes_json_e)
routesEmpleados.post('/crear_empleado', validarSchemmaGenerico(EmpleadosSchema), crear_empleado)
routesEmpleados.put('/editar_empleado/:id', validarSchemmaGenerico(EmpleadosSchema), editar_empleado)
routesEmpleados.delete('/eliminar_empleado/:id', eliminar_empleado)

export default routesEmpleados