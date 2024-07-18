const currentDate = new Date()
import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    edad_minima,
    pattern_Nombre,
    pattern_Direccion,
    pattern_soloLetras
} from '../config.js'
const mayorMenor = new Date(currentDate.getFullYear() - edad_minima, currentDate.getMonth(), currentDate.getDate())


class Clientes extends Model {}

Clientes.init({
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_cliente: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nombre de Cliente es requerido"
            },
            len: {
                args: [1, 70],
                msg: "El nombre de Cliente no puede tener más de 70 caracteres"
            },
            is: {
                args: pattern_Nombre,
                msg: "Nombre de Cliente sólo puede contener letras y espacios"
            }
        }
    },
    dni_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "DNI de Cliente debe ser un número entero"
            }
        }
    },
    rg_cliente: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: {
                args: [1, 100],
                msg: "RG Cliente no puede tener más de 100 caracteres"
            },
            is: {
                args: pattern_Direccion,
                msg: "RG de Cliente sólo puede contener letras y numeros"
            }
        }
    },
    dir_cliente: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Dirección de Cliente es requerida"
            },
            len: {
                args: [1, 100],
                msg: "Dirección de Cliente no puede tener más de 100 caracteres"
            },
            is: {
                args: pattern_Direccion,
                msg: "Formato de Dirección inválido"
            }
        }
    },
    tel_cliente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Teléfono de Cliente es requerido"
            },
            isInt: {
                msg: "Teléfono de Cliente debe ser un número entero"
            }
        }
    },
    email_cliente: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email de Cliente es requerido"
            },
            isEmail: {
                msg: "Formato de Email inválido"
            }
        }
    },
    ciudad_cliente: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ciudad de Cliente es requerida"
            },
            len: {
                args: [1, 45],
                msg: "Ciudad de Cliente no puede tener más de 45 caracteres"
            },
            is: {
                args: pattern_Nombre,
                msg: "Ciudad de Cliente sólo puede contener letras y espacios"
            }
        }
    },
    pais_cliente: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                msg: "País de Cliente es requerido"
            },
            len: {
                args: [1, 45],
                msg: "País de Cliente no puede tener más de 45 caracteres"
            },
            is: {
                args: pattern_soloLetras,
                msg: "País de Cliente sólo puede contener letras y espacios"
            }
        }
    },
    fechnac: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Fecha de Nacimiento es requerida"
            },
            isDate: {
                msg: "Formato de Fecha de Nacimiento inválido"
            },
            isValidAge(value) {
                if (new Date(value) > mayorMenor) {
                    throw new Error("Debe ser mayor de edad");
                }
            }
        }
    },
    categoria: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Categoría es requerida"
            },
            len: {
                args: [1, 45],
                msg: "Categoría no puede tener más de 45 caracteres"
            },
            is: {
                args: pattern_soloLetras,
                msg: "Categoría sólo puede contener letras y espacios"
            }
        }
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    }
}, {
    sequelize,
    modelName: "clientes",
    tableName: "clientes",
    timestamps: false
})

export default Clientes