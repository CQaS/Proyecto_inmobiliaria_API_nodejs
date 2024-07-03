import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routesInmuebles from './router/inmuebles.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routesInmuebles)

// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

export default app