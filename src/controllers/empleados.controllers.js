import QUERY_SEQUELIZE_EMPLEADOS from "../querys/querys.empleados.js"
const {
    listarEmpleados,
    guardarEmpleado,
    consultarDni,
    consultarEmail,
    consultarEmpleado,
    eliminarEmpleado
} = QUERY_SEQUELIZE_EMPLEADOS

export const empleados_lista = async (req, res) => {
    try {
        const _listarClientes = await listarEmpleados()
        console.log(_listarClientes)
        console.log(_listarClientes.length)
        res.json(_listarClientes)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const reportes_json_e = async (req, res) => {
    try {
        const _reportesJsonE = await listarEmpleados()
        console.log(_reportesJsonE)
        res.json(_reportesJsonE)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_empleado = async (req, res) => {

    /* {
        "nom_empleado": "Juan Perez",
        "dni_empleado": 12345678,
        "tel_empleado": 987654321,
        "dir_empleado": "Calle Falsa 123",
        "email_empleado": "juan.perez@example.com",
        "nom_puesto": "Gerente"
    } */


    try {
        const {
            dni_empleado,
            email_empleado
        } = req.body

        const existeDNI = await consultarDni(dni_empleado)
        console.log(existeDNI)

        if (existeDNI != null) {
            return res.status(404).json({
                Error: `DNI ya existe: ${dni_empleado}`
            })
        }

        const existeEmail = await consultarEmail(email_empleado)

        if (existeEmail != null) {
            return res.status(404).json({
                Error: `Email ya existe: ${email_empleado}`
            })
        }

        const EmpleadoGuardado = await guardarEmpleado(0, req.body)

        if (EmpleadoGuardado.ok) {

            return res.status(200).json(EmpleadoGuardado)
        }

        if (EmpleadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Empleado!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_empleado = async (req, res) => {
    try {

        const id = req.params.id
        const {
            dni_empleado,
            email_empleado
        } = req.body

        const el_empleado = await consultarEmpleado(id)
        if (el_empleado == null) {
            return res.status(404).json({
                Error: "Empleado no encontrado"
            })
        }

        if (dni_empleado != el_empleado.dni_empleado) {
            const existeDNI = await consultarDni(dni_empleado)
            console.log(existeDNI)

            if (existeDNI != null) {
                return res.status(404).json({
                    Error: `DNI ya existe: ${dni_empleado}`
                })
            }
        }

        if (email_empleado != el_empleado.email_empleado) {
            const existeEmail = await consultarEmail(email_empleado)

            if (existeEmail != null) {
                return res.status(404).json({
                    Error: `Email ya existe: ${email_empleado}`
                })
            }
        }


        const EmpleadoGuardado = await guardarEmpleado(id, req.body)

        if (EmpleadoGuardado.ok) {

            return res.status(200).json(EmpleadoGuardado)
        }

        if (EmpleadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Empleado!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const recibo_empleado = async (req, res) => {
    try {
        const id = req.params.id

        const el_empleado = await consultarEmpleado(id)
        if (el_empleado == null) {
            return res.status(404).json({
                Error: "Empleado no encontrado"
            })
        }

        res.status(200).json(el_empleado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}
export const eliminar_empleado = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarEmpleado(id)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}