import {
    Router
} from "express"
import {
    clientes_lista,
    crear_cliente,
    editar_cliente,
    recibo_cliente,
    eliminar_cliente,
    cliente_loc_nombre,
    cliente_loc_dni,
    cliente_prop_nombre
} from "../controllers/clientes.controllers.js"

const routesClientes = Router()

routesClientes.get('/clientes_lista', clientes_lista)
routesClientes.get('/recibo_cliente/:id', recibo_cliente)
routesClientes.get('/cliente_loc_nombre/:nombre', cliente_loc_nombre)
routesClientes.get('/cliente_loc_dni/:dni', cliente_loc_dni)
routesClientes.get('/cliente_prop_nombre/:nombre', cliente_prop_nombre)
routesClientes.post('/crear_cliente', crear_cliente)
routesClientes.put('/editar_cliente/:id', editar_cliente)
routesClientes.delete('/eliminar_cliente/:id', eliminar_cliente)

export default routesClientes