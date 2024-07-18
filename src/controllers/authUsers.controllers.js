import QUERY_SEQUELIZE_AUTHUSERS from "../querys/querys.authUsers.js"
const {
    consultarUsers
} = QUERY_SEQUELIZE_AUTHUSERS

export const Login = async (req, res) => {
    try {

        const R = await consultarUsers()

        return res.status(200).json({
            ok: 'Login',
            data: R
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
    try {

        return res.status(200).json({
            ok: 'crear_user'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const EditarUser = async (req, res) => {
    try {
        id = req.params.id

        return res.status(200).json({
            ok: `editar_user ${id}`
        })

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