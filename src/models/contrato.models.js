import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    pattern_Direccion
} from '../config.js'

class Contrato extends Model {}

Contrato.init({
    id_contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_operacion: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: 'S/D',
        validate: {
            len: {
                args: [0, 45],
                msg: 'Tipo de operación puede tener hasta 45 caracteres'
            }
        }
    },
    fecha_contrato: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Fecha de contrato debe ser una fecha válida'
            }
        }
    },
    fecha_ing: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Fecha de ingreso debe ser una fecha válida'
            }
        }
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Fecha de salida debe ser una fecha válida'
            }
        }
    },
    cant_dias: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'Cantidad de días debe ser un número entero'
            },
            min: {
                args: [1],
                msg: 'Cantidad de días debe ser al menos 1'
            }
        }
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes', // Nombre de la tabla a la que hace referencia
            key: 'id_cliente'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    valor_total: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: {
                msg: 'Valor total debe ser un número'
            },
            len: {
                args: [0, 15],
                msg: 'Valor total puede tener hasta 15 caracteres'
            }
        }
    },
    monto_reserva: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: {
                msg: 'Monto de reserva debe ser un número'
            },
            len: {
                args: [0, 15],
                msg: 'Monto de reserva puede tener hasta 15 caracteres'
            }
        }
    },
    fecha_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Fecha de reserva debe ser una fecha válida'
            }
        }
    },
    datos_envio: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            len: {
                args: [0, 250],
                msg: 'Datos de envío puede tener hasta 250 caracteres'
            },
            is: {
                args: pattern_Direccion,
                msg: "Formato de Dirección inválido"
            }
        }
    },
    inmueble_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Inmueble', // Nombre de la tabla a la que hace referencia
            key: 'id_inmueble'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize,
    modelName: "contrato",
    tableName: "contrato",
    timestamps: false
})

export default Contrato