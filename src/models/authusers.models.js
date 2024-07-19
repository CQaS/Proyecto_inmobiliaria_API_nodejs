import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    usernamePattern,
    namePattern
} from '../config.js'

class AuthUser extends Model {}

AuthUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Nombre de usuario requerido'
            },
            len: {
                args: [1, 150],
                msg: 'Máximo 150 caracteres'
            },
            is: {
                args: usernamePattern,
                msg: 'Formato de nombre de usuario inválido'
            }
        }
    },
    first_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
            len: {
                args: [0, 30],
                msg: 'Máximo 30 caracteres'
            },
            is: {
                args: namePattern,
                msg: 'Formato de nombre inválido'
            }
        }
    },
    last_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
            len: {
                args: [0, 30],
                msg: 'Máximo 30 caracteres'
            },
            is: {
                args: namePattern,
                msg: 'Formato de apellido inválido'
            }
        }
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Formato de email inválido'
            },
            len: {
                args: [0, 254],
                msg: 'Máximo 254 caracteres'
            }
        }
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Contraseña requerida'
            },
            len: {
                args: [1, 128],
                msg: 'Máximo 128 caracteres'
            }
        }
    },
    is_superuser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'AuthUser',
    tableName: 'auth_user',
    timestamps: false
})

export default AuthUser