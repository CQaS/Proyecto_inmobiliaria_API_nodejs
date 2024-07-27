import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './router/index.js'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

routes.forEach(({
    path,
    router
}) => {
    app.use('/api' + path, router)
})

// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
    res.status(404).json({
        Error: 'Ruta no encontrada'
    })
})

export default app