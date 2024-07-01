import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Fotos_prop extends Model {}

Fotos_prop.init({
    image: {
        type: DataTypes.STRING, // Puedes ajustar el tipo según cómo manejas las imágenes en tu aplicación
        allowNull: false,
        validate: {
            isUrl: true, // Asumiendo que la imagen es una URL en este ejemplo
        },
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

const listarFotos_Prop = async () => {
    await Fotos_prop.sync()
    return await Fotos_prop.findAll()
}

const QUERY_SEQUELIZE_FOTOS_PROP = {
    listarFotos_Prop
}

export default QUERY_SEQUELIZE_FOTOS_PROP