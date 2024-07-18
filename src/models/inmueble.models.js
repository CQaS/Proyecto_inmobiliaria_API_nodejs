import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    pattern_Direccion,
    pattern_cod_,
} from '../config.js'

class Inmueble extends Model {}

Inmueble.init({
    id_inmueble: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dir_inmueble: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Direccion es requerida'
            },
            is: {
                args: pattern_Direccion,
                msg: 'Direccion contiene caracteres inválidos'
            }
        }
    },
    barrio_inmueble: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Barrio es requerido'
            },
            is: {
                args: pattern_Direccion,
                msg: 'Barrio contiene caracteres inválidos'
            }
        }
    },
    bloco_inmueble: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Bloco es requerido'
            },
            is: {
                args: pattern_Direccion,
                msg: 'Bloco contiene caracteres inválidos'
            }
        }
    },
    ciudad_inmueble: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Ciudad es requerida'
            },
            is: {
                args: pattern_Direccion,
                msg: 'Ciudad contiene caracteres inválidos'
            }
        }
    },
    nombre_red: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Red WiFi es requerida'
            },
            is: {
                args: pattern_Direccion,
                msg: 'Red WiFi contiene caracteres inválidos'
            }
        }
    },
    num_apto: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Apto es requerido'
            }
        }
    },
    tipo_inmueble: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Tipo de Propiedad es requerido'
            },
            isAlpha: {
                msg: 'Tipo de Propiedad debe contener solo letras'
            }
        }
    },
    tipo_operacion: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Tipo de Operacion es requerido'
            },
            isAlpha: {
                msg: 'Tipo de Operacion debe contener solo letras'
            }
        }
    },
    sup_total: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Superficie es requerida'
            },
            isNumeric: {
                msg: 'Superficie debe ser numérica'
            }
        }
    },
    sup_cubierta: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Super. Cubierta es requerida'
            },
            isNumeric: {
                msg: 'Super. Cubierta debe ser numérica'
            }
        }
    },
    sup_semicub: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Super. Semicubierta es requerida'
            },
            isNumeric: {
                msg: 'Super. Semicubierta debe ser numérica'
            }
        }
    },
    cant_plantas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Cant. de Plantas es requerida'
            },
            isInt: {
                msg: 'Cant. de Plantas debe ser un número entero'
            }
        }
    },
    cant_dormitorios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Cant. de Dormitorios es requerida'
            },
            isInt: {
                msg: 'Cant. de Dormitorios debe ser un número entero'
            }
        }
    },
    cant_banos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Cant. de Baños es requerida'
            },
            isInt: {
                msg: 'Cant. de Baños debe ser un número entero'
            }
        }
    },
    cochera: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    cochera_rotativa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    cod_referencia: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Cod. Referencia es requerido'
            },
            is: {
                args: pattern_cod_,
                msg: 'Cod. Referencia contiene caracteres inválidos'
            }
        }
    },
    condicion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Condicion es requerida'
            },
            isAlpha: {
                msg: 'Condicion debe contener solo letras'
            }
        }
    },
    expensas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Descripcion es requerida'
            }
        }
    },
    clave_puerta_ingreso: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Clave Puerta Ingreso es requerida'
            },
            is: {
                args: pattern_cod_,
                msg: 'Clave Puerta Ingreso contiene caracteres inválidos'
            }
        }
    },
    clave_puerta_ingreso2: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Clave Puerta Ingreso 2 es requerida'
            },
            is: {
                args: pattern_cod_,
                msg: 'Clave Puerta Ingreso 2 contiene caracteres inválidos'
            }
        }
    },
    clave_wifi: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Clave Wi-Fi es requerida'
            }
        }
    },
    tipo_servicio: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: 'SD',
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_inmueble: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Valor es requerido'
            },
            isNumeric: {
                msg: 'Valor debe ser numérico'
            }
        }
    },
    exclusividad: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    habitac_maxima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Hab. max. es requerido'
            },
            isInt: {
                msg: 'Hab. max. debe ser un número entero'
            }
        }
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    latitud: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '0.0',
        validate: {
            notEmpty: {
                msg: 'Latitud es requerida'
            },
            isNumeric: {
                msg: 'Latitud debe ser numérica'
            }
        }
    },
    longitud: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '0.0',
        validate: {
            notEmpty: {
                msg: 'Longitud es requerida'
            },
            isNumeric: {
                msg: 'Longitud debe ser numérica'
            }
        }
    }
}, {
    sequelize,
    modelName: "inmueble",
    tableName: "inmueble",
    timestamps: false
})

export default Inmueble