import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './router/index.js'
import bodyParser from 'body-parser'
import session from 'express-session'
import {
    SECRET_KEY_SESSION
} from './config.js'

const app = express()

const corsOptions = {
    origin: ['http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(session({
    secret: SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
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