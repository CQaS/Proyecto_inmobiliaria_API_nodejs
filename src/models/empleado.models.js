import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    pattern_Nombre,
    pattern_Direccion
} from '../config.js'

class Empleado extends Model {}

Empleado.init({
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_empleado: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nombre de empleado es requerido"
            },
            notEmpty: {
                msg: "Nombre de empleado no puede estar vacío"
            },
            len: {
                args: [1, 70],
                msg: "Nombre de empleado debe tener entre 1 y 70 caracteres"
            },
            is: {
                args: pattern_Nombre,
                msg: "Nombre de Empleado sólo puede contener letras y espacios"
            }
        },
        comment: "Nombre del empleado"
    },
    dni_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "DNI de empleado es requerido"
            },
            notEmpty: {
                msg: "DNI de empleado no puede estar vacío"
            },
            isInt: {
                msg: "DNI de empleado debe ser un número entero"
            },
            len: {
                args: [7, 8],
                msg: "DNI de empleado debe tener entre 7 y 8 dígitos"
            },
        },
        comment: "Documento Nacional de Identidad del empleado"
    },
    tel_empleado: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Teléfono de empleado es requerido"
            },
            notEmpty: {
                msg: "Teléfono de empleado no puede estar vacío"
            },
            isInt: {
                msg: "Teléfono de empleado debe ser un número entero"
            },
        },
        comment: "Número de teléfono del empleado"
    },
    dir_empleado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Dirección de empleado es requerida"
            },
            notEmpty: {
                msg: "Dirección de empleado no puede estar vacía"
            },
            len: {
                args: [1, 100],
                msg: "Dirección de empleado debe tener entre 1 y 100 caracteres"
            },
            is: {
                args: pattern_Direccion,
                msg: "Formato de Dirección inválido"
            }
        },
        comment: "Dirección del empleado"
    },
    email_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email de empleado es requerido"
            },
            notEmpty: {
                msg: "Email de empleado no puede estar vacío"
            },
            isEmail: {
                msg: "Formato de email inválido"
            },
        },
        comment: "Email del empleado"
    },
    nom_puesto: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nombre de puesto es requerido"
            },
            notEmpty: {
                msg: "Nombre de puesto no puede estar vacío"
            },
            len: {
                args: [1, 45],
                msg: "Nombre de puesto debe tener entre 1 y 45 caracteres"
            },
            isAlpha: {
                msg: "Nombre de puesto solo debe contener letras"
            },
        },
        comment: "Nombre del puesto del empleado"
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    }
}, {
    sequelize,
    modelName: "empleados",
    tableName: "empleados",
    timestamps: false
})

export default Empleado