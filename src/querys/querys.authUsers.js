import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    AuthUsers,
    Block
} from '../models/asociacion.js'

const consultarAuthUser = async (id) => {
    await AuthUsers.sync()
    return await AuthUsers.findOne({
        where: {
            id
        }
    })
}

const consultarUsername = async (useremail) => {
    await AuthUsers.sync()
    return await AuthUsers.findAll({
        where: {
            [Op.or]: [{
                username: useremail
            }, {
                email: useremail
            }]
        }
    })
}

const consultarEmail = async (email) => {
    await AuthUsers.sync()
    return await AuthUsers.findAll({
        where: {
            email
        }
    })
}

const guardarAuthUser = async (id, datosAuthUser) => {
    try {
        if (id == 0) {

            const autUserGuardado = await AuthUsers.create(datosAuthUser)
            console.log('AuthUser guardado:', autUserGuardado)
            return {
                ok: 'AuthUser creado existosamente!',
                data: autUserGuardado,
                id_authUser_nuevo: autUserGuardado.id
            }

        } else {

            const [updatedRows] = await AuthUsers.update(datosAuthUser, {
                where: {
                    id
                }
            })

            if (updatedRows === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del AuthUser son los mismos!",
                    data: datosAuthUser
                }
            }

            return {
                ok: "AuthUser actualizado exitosamente!",
                data: datosAuthUser
            }
        }


    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al guardar el AuthUser:', error)
            return {
                Error: error
            }
        }
    }
}

const reset_password = async (datos) => {
    try {
        const username = datos.username
        const email = datos.email

        const [updatedRows] = await AuthUsers.update(datos, {
            where: {
                username,
                email
            }
        })

        if (updatedRows === 0) {
            return {
                ok: "No se realizaron cambios, los datos del AuthUser.password son los mismos!"
            }
        }

        return {
            ok: "AuthUser.password actualizado exitosamente!"
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al guardar el password:', error)
            return {
                Error: error
            }
        }
    }
}

const verificarBloqueado = async (username_email) => {
    await Block.sync()
    return await Block.findOne({
        where: {
            user_email: username_email
        }
    })
}

const crearBlock = async (bandera, dataBlock) => {
    try {
        if (bandera == 1) {

            const data_block = await Block.create(dataBlock)
            console.log('Block guardado:', data_block)
            return {
                ok: 'Block creado existosamente!',
                data: data_block,
            }

        } else if (bandera == 2) {
            await dataBlock.save()
            return {
                ok: 'Block actualizado existosamente!'
            }

        } else {

            Block.destroy({
                where: {
                    user_email: dataBlock
                }
            })

            return {
                ok: "Block eliminado exitosamente!",
                data: dataBlock
            }
        }


    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al guardar el AuthUser:', error)
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_AUTHUSERS = {
    consultarUsername,
    consultarEmail,
    guardarAuthUser,
    consultarAuthUser,
    reset_password,
    verificarBloqueado,
    crearBlock
}

export default QUERY_SEQUELIZE_AUTHUSERS