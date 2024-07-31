import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    usernamePattern,
    namePattern
} from '../config.js'

class Block extends Model {}

Block.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    last_attempt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    blocked_until: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Block',
    tableName: 'block',
    timestamps: false
})

export default Block