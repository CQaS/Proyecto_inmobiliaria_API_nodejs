import mysql from 'mysql2'
import {
    DATABASE,
    HOST,
    PASSWORD,
    USER,

} from '../config.js'

const mysqlCon = mysql.createPool({
    connectionLimit: 5000,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

mysqlCon.getConnection((err) => {
    err ? console.error(err) : console.log('Conectado a Inmobiliaria')
})

export default mysqlCon