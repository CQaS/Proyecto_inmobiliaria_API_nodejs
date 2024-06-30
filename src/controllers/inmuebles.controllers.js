import mysqlCon from "../db/db.js"

export const exclusivos = (req, res) => {
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
}

export const inmuebles_crear = (req, res) => {
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
}