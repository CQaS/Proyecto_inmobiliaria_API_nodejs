import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import routes from './router/index.js'
import bodyParser from 'body-parser'

const app = express()

const corsOptions = {
    origin: ['http://127.0.0.1:5500'], // Puedes agregar más orígenes si es necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Permitir cookies y otros encabezados de autenticación
}

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})

app.use(morgan('dev', {
    stream: logStream
}))

app.use(cors(corsOptions))
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