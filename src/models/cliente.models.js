import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Clientes extends Model {}

Clientes.init({
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rg_cliente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dir_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel_cliente: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    email_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    ciudad_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pais_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechnac: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: "clientes",
    tableName: "clientes",
    timestamps: false
})

export default Clientes