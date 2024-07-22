import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routesInmuebles from './router/inmuebles.routes.js'
import routesClientes from './router/clientes.routes.js'
import AuthUser from './router/authusers.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/inmuebles', routesInmuebles)
app.use('/api/clientes', routesClientes)
app.use('/api/authusers', AuthUser)

// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
    res.status(404).json({
        Error: 'Ruta no encontrada'
    });
});

export default app