import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize'

import {
    DATABASE,
    HOST,
    PASSWORD,
    USER,

} from '../config.js'

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
})

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log(`Connection has been established successfully. DB : ${DATABASE}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testConnection()

const SDM = {
    sequelize,
    DataTypes,
    Model
}

export default SDM