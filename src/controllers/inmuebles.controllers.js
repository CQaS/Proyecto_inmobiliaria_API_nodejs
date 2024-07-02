/* import mysqlCon from "../db/mysql_DB.js" */

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

import QUERY_SEQUELIZE_INMUEBLES from "../querys/querys.inmuebles.js"
const {
    listarExclisivos,
    detalles
} = QUERY_SEQUELIZE_INMUEBLES

export const exclusivos = async (req, res) => {
    try {

        const listarExclusivos = await listarExclisivos()
        console.log(listarExclusivos.length)
        console.log(listarExclusivos)
        res.json(listarExclusivos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}

export const inmueble_detalles = async (req, res) => {

    try {
        const id = req.params.id

        const _detalles = await detalles(id)
        console.log(_detalles.length)
        console.log(_detalles)
        res.json(_detalles)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            err: 'Algo fallo'
        })

    }
}