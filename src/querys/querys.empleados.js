import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Empleado
} from '../models/asociacion.js'


const listarEmpleados = async () => {
    await Empleado.sync()
    return await Empleado.findAll({
        where: {
            estado: 1
        }
    })
}

const guardarEmpleado = async (id, datosEmpleado) => {
    try {
        if (id == 0) {

            const empleadoGuardado = await Empleado.create(datosEmpleado)
            console.log('Empleado guardado:', empleadoGuardado)
            return {
                ok: 'Empleado creado existosamente!',
                data: empleadoGuardado,
                id_empleado_nuevo: empleadoGuardado.id_emppleado
            }

        } else {

            const [updatedRows] = await Empleado.update(datosEmpleado, {
                where: {
                    id_empleado: id
                }
            })

            if (updatedRows === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Empleado son los mismos!",
                    data: datosEmpleado
                }
            }

            return {
                ok: "Empleado actualizado exitosamente!",
                data: datosEmpleado
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
            console.error('Error al guardar el Empleado:', error)
            return {
                Error: error
            }
        }
    }
}

const consultarEmpleado = async (id) => {
    await Empleado.sync()
    return await Empleado.findOne({
        where: {
            id_empleado: id,
            estado: 1
        }
    })
}

const consultarDni = async (dni) => {
    await Empleado.sync()
    return await Empleado.findOne({
        where: {
            dni_empleado: dni
        }
    })
}

const consultarEmail = async (email) => {
    await Empleado.sync()
    return await Empleado.findOne({
        where: {
            email_empleado: email
        }
    })
}

const eliminarEmpleado = async (id) => {
    try {
        const empleado = await Empleado.findByPk(id)

        if (!empleado) {
            return {
                Error: 'Empleado no encontrado'
            }
        }

        empleado.estado = empleado.estado === 1 ? 0 : 1
        await empleado.save()
        console.log(`Empleado ${id}, actualizado a Estado: ${empleado.estado}`)

        return {
            ok: `Empleado ${id}, actualizado a Estado: ${empleado.estado}`,
            data: empleado
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
            console.error('Error al eliminar el Empleado:', error)
            return {
                Error: error
            }
        }
    }
}

const QUERY_SEQUELIZE_EMPLEADOS = {
    listarEmpleados,
    guardarEmpleado,
    consultarDni,
    consultarEmail,
    consultarEmpleado,
    eliminarEmpleado
}

export default QUERY_SEQUELIZE_EMPLEADOS