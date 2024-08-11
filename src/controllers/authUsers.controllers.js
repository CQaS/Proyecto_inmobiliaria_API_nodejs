import passHash from 'bcryptjs'
import {
    crearToken
} from '../libs/jwt.js'
import QUERY_SEQUELIZE_AUTHUSERS from "../querys/querys.authUsers.js"
const {
    consultarUsername,
    consultarEmail,
    guardarAuthUser,
    consultarAuthUser,
    reset_password,
    verificarBloqueado,
    crearBlock
} = QUERY_SEQUELIZE_AUTHUSERS

import {
    salt
} from '../config.js'

export const Login = async (req, res) => {

    /* {
        "username": "Yani",
        "password": "yaniyani"
    } */

    try {

        const {
            username,
            email,
            password
        } = req.body

        let password_DB = null
        let id = null
        let usernameEmail = null
        let block = null

        if (username) {

            const existeUSERNAME = await consultarUsername(username)

            if (existeUSERNAME.length == 0) {
                return res.status(404).json({
                    Error: `USERNAME no existe: ${username}`
                })
            }
            console.log(existeUSERNAME)
            password_DB = existeUSERNAME[0].dataValues.password
            id = existeUSERNAME[0].dataValues.id

            block = await verificarBloqueado(username)
            usernameEmail = username

        } else if (email) {

            const existeEMAIL = await consultarEmail(email)

            if (existeEMAIL.length == 0) {
                return res.status(404).json({
                    Error: `EMAIL no existe: ${email}`
                })
            }
            console.log(existeEMAIL)
            password_DB = existeEMAIL[0].dataValues.password
            id = existeEMAIL[0].dataValues.id

            block = await verificarBloqueado(email)
            usernameEmail = email

        } else {

            return res.status(404).json({
                Error: 'Email & Username Requiridos!!'
            })
        }


        const password_compare = await passHash.compare(password, password_DB)

        if (!password_compare) {

            // Verificar si el usuario está bloqueado
            if (block) {

                if (block.attempts >= 5) {

                    block.blocked_until = new Date(Date.now() + 15 * 60 * 1000) // Bloquear por 15 minutos

                    const dataBlock = await crearBlock(2, block)
                    console.log(dataBlock)

                    return res.status(403).json({
                        Error: 'Demasiados intentos fallidos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.'
                    })
                }

                block.attempts += 1
                block.last_attempt = new Date()
                console.log(`INTENTOS..............: ${block.attempts}`)

                const dataBlock = await crearBlock(2, block)
                console.log(dataBlock)

            } else {

                const dataBlock = await crearBlock(1, {
                    user_email: usernameEmail,
                    attempts: 1,
                    last_attempt: new Date()
                })
                console.log(dataBlock)
            }

            return res.status(404).json({
                Error: 'Password incorrecto!'
            })
        }

        // Restablecer intentos fallidos en caso de éxito
        if (block) {
            const dataBlock = await crearBlock(0, usernameEmail)
            console.log(dataBlock)
        }

        const token = await crearToken({
            id
        })
        res.cookie("token", token)

        return res.status(200).json({
            ok: 'Login',
            data: {
                id
            }
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const Logout = async (req, res) => {
    try {

        res.cookie("token", '', {
            expires: new Date(0)
        })

        return res.status(200).json({
            ok: 'Logout'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const CrearUser = async (req, res) => {

    /* {
        "username": "newuser",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "password": "your_password",
        "is_staff": true,
        "is_active": true,
        "is_superuser": false
    } */

    try {

        const {
            username,
            email,
            password,
            ...datosAuthUserNuevo
        } = req.body

        const existeUSERNAME = await consultarUsername(username)
        console.log(existeUSERNAME)

        if (existeUSERNAME.length > 0) {
            return res.status(404).json({
                Error: `USERNAME ya existe: ${username}`
            })
        }

        const existeEMAIL = await consultarEmail(email)
        console.log(existeEMAIL)

        if (existeEMAIL.length > 0) {
            return res.status(404).json({
                Error: `EMAIL ya existe: ${email}`
            })
        }

        const salar = await passHash.genSalt(salt)
        const passwordHash = await passHash.hash(password, salar)

        datosAuthUserNuevo.username = username
        datosAuthUserNuevo.email = email
        datosAuthUserNuevo.password = passwordHash

        const AuthUserGuardado = await guardarAuthUser(0, datosAuthUserNuevo)

        if (AuthUserGuardado.ok) {

            /* const token = await crearToken({
                id: AuthUserGuardado.id_authUser_nuevo
            })
            res.cookie("token", token) */

            return res.status(200).json(AuthUserGuardado)
        }

        if (AuthUserGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el AuthUser Nuevo!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const EditarUser = async (req, res) => {
    try {
        const id = req.params.id

        const {
            username,
            email,
            password,
            ...datosAuthUserNuevo
        } = req.body

        const el_authUser = await consultarAuthUser(id)
        if (el_authUser == null) {
            return res.status(404).json({
                Error: "AuthUser no encontrado"
            })
        }

        if (el_authUser.username != username) {
            const existeUSERNAME = await consultarUsername(username)
            console.log(existeUSERNAME)

            if (existeUSERNAME.length > 0) {
                return res.status(404).json({
                    Error: `USERNAME ya existe: ${username}`
                })
            }
        }

        if (el_authUser.email != email) {
            const existeEMAIL = await consultarEmail(email)
            console.log(existeEMAIL)

            if (existeEMAIL.length > 0) {
                return res.status(404).json({
                    Error: `EMAIL ya existe: ${email}`
                })
            }
        }

        const salar = await passHash.genSalt(salt)
        const passwordHash = await passHash.hash(password, salar)

        datosAuthUserNuevo.username = username
        datosAuthUserNuevo.email = email
        datosAuthUserNuevo.password = passwordHash

        const AuthUserGuardado = await guardarAuthUser(id, datosAuthUserNuevo)

        if (AuthUserGuardado.ok) {

            return res.status(200).json(AuthUserGuardado)
        }

        if (AuthUserGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el AuthUser Nuevo!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const EliminarUser = async (req, res) => {
    try {
        id = req.params.id

        return res.status(200).json({
            ok: `eliminar_user ${id}`
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const ResetPassword = async (req, res) => {
    try {
        const {
            password
        } = req.body

        const salar = await passHash.genSalt(salt)
        const passwordHash = await passHash.hash(password, salar)

        const datos = req.body
        datos.password = passwordHash

        const AuthPassword = await reset_password(datos)

        if (AuthPassword.ok) {

            return res.status(200).json(AuthPassword)
        }

        if (AuthPassword.Error) {

            return res.status(404).json({
                Error: 'Error al guardar Password Nuevo!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}