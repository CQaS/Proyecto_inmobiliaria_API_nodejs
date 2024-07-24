import routesInmuebles from './inmuebles.routes.js'
import routesClientes from './clientes.routes.js'
import routesEmpleados from './empleados.routes.js'
import AuthUser from './authusers.routes.js'

export default [{
        path: '/inmuebles',
        router: routesInmuebles
    },
    {
        path: '/clientes',
        router: routesClientes
    },
    {
        path: '/empleados',
        router: routesEmpleados
    },
    {
        path: '/authusers',
        router: AuthUser
    },
]