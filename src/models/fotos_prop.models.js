import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Fotos_prop extends Model {}

Fotos_prop.init({
    id_foto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inmueble_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "fotos_prop",
    tableName: "fotos_prop",
    timestamps: false
})

export default Fotos_prop