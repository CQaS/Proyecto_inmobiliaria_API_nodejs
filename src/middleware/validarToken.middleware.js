import jwt from "jsonwebtoken";
import {
    SECRET_KEY
} from "../config.js";

export const authRequerido = (req, res, next) => {
    const {
        token
    } = req.cookies

    if (!token) return res.status(400).json({
        Error: 'NO TIENES ACCESSO AUTORIZADO, SIN TOKEN!'
    })

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            Error: 'NO TIENES ACCESSO AUTORIZADO, TOKEN INVALIDO!'
        })
        req.user = user

        console.log('token vaido')

        next();
    })
}