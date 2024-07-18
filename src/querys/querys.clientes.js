import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js";
const {
    sequelize
} = SDM

import {
    Cliente
} from '../models/asociacion.js'

const consultarCliente = async (id) => {
    await Cliente.sync()
    return await Cliente.findOne({
        where: {
            id_cliente: id,
            estado: 1
        }
    })
}

const consultarDni = async (dni) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            dni_cliente: dni
        }
    })
}

const consultarRG = async (RG) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            rg_cliente: RG
        }
    })
}

const consultarEmail = async (email) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            email_cliente: email
        }
    })
}

const listarClientes = async () => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            estado: 1
        }
    })
}

const clienteLocDni = async (dni) => {
    await Cliente.sync()
    return await Cliente.findOne({
        where: {
            categoria: 'Locatario',
            dni_cliente: dni,
            estado: 1
        }
    })
}

const clienteLocNombre = async (nombre) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            categoria: 'Locatario',
            nom_cliente: {
                [Op.like]: `%${nombre}%`
            },
            estado: 1
        }
    })
}

const clientePropNombre = async (nombre) => {
    await Cliente.sync()
    return await Cliente.findAll({
        where: {
            categoria: 'Propietario',
            nom_cliente: {
                [Op.like]: `%${nombre}%`
            },
            estado: 1
        }
    })
}

const guardarCliente = async (id, datosCliente) => {
    try {
        if (id == 0) {

            const clienteGuardado = await Cliente.create(datosCliente);
            console.log('Cliente guardado:', clienteGuardado)
            return {
                ok: 'Cliente creado existosamente!',
                data: clienteGuardado,
                id_cliente_nuevo: clienteGuardado.id_cliente
            }

        } else {

            const [updatedRows] = await Cliente.update(datosCliente, {
                where: {
                    id_cliente: id
                }
            })

            if (updatedRows === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Cliente son los mismos!",
                    data: datosCliente
                }
            }

            return {
                ok: "Cliente actualizado exitosamente!",
                data: datosCliente
            }
        }


    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error);
            return {
                Error: error
            }
        } else {
            console.error('Error al guardar el Inmueble:', error);
            return {
                Error: error
            }
        }
    }
}

const eliminarCliente = async (id) => {
    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return {
                Error: 'Cliente no encontrado'
            }
        }

        cliente.estado = cliente.estado === 1 ? 0 : 1
        await cliente.save()
        console.log(`Cliente ${id}, actualizado a Estado: ${cliente.estado}`)

        return {
            ok: `Cliente ${id}, actualizado a Estado: ${cliente.estado}`,
            data: cliente
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error);
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error);
            return {
                Error: error
            }
        } else {
            console.error('Error al eliminar el cliente:', error);
            return {
                Error: error
            }
        }
    }
}

const reciboCliente = async (id) => {
    const R = await sequelize.query(`
        SELECT cli.nom_cliente, inm.cod_referencia, inm.cliente_id as idPropietario, inm.nombre_red, inm.clave_wifi, con.fecha_ing, con.fecha_salida, (con.valor_total - con.monto_reserva) AS saldo 
        FROM clientes cli 
        JOIN contrato con ON cli.id_cliente = con.cliente_id 
        JOIN inmueble inm ON con.inmueble_id = inm.id_inmueble 
        WHERE cli.id_cliente = :id
        `, {
        replacements: {
            id
        },
        type: SequelizeLib.QueryTypes.SELECT
    })

    return R
}

const QUERY_SEQUELIZE_CLIENTES = {
    consultarCliente,
    consultarDni,
    consultarEmail,
    consultarRG,
    listarClientes,
    clienteLocDni,
    clienteLocNombre,
    clientePropNombre,
    guardarCliente,
    reciboCliente,
    eliminarCliente
}

export default QUERY_SEQUELIZE_CLIENTES