import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Empleados extends Model {}

Empleados.init({
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tel_empleado: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    dir_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    nom_puesto: {
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
    modelName: "empleados",
    tableName: "empleados",
    timestamps: false
})

const listarEmpleado = async () => {
    await Empleados.sync()
    return await Empleados.findAll()
}

const QUERY_SEQUELIZE_EMPLEADO = {
    listarEmpleado
}

export default QUERY_SEQUELIZE_EMPLEADO