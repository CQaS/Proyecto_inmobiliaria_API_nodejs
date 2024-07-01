/* import mysqlCon from "../db/mysql_DB.js" */
import QUERY_SEQUELIZE_INMUEBLES from "../models/inmueble.models.js"
const {
    listarExclisivos
} = QUERY_SEQUELIZE_INMUEBLES

export const exclusivos = async (req, res) => {
    try {

        const listarExclusivos = await listarExclisivos()
        console.log(listarExclusivos)
        res.json(listarExclusivos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

/* export const exclusivos = (req, res) => {
    const sql = 'SELECT * FROM inmueble'

    try {
        mysqlCon.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    err: 'Algo fallo'
                })
            }
            res.json(result)
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
} */

/* export const inmuebles_crear = (req, res) => {
    const sql = ''

    try {
        mysqlCon.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    err: 'Algo fallo'
                })
            }
            res.json(result)
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
} */