import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Contrato extends Model {}

Contrato.init({
    id_contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_operacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'S/D',
    },
    fecha_contrato: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    fecha_ing: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cant_dias: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_total: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto_reserva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    datos_envio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inmueble_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "contrato",
    tableName: "contrato",
    timestamps: false
})

const listarContratos = async () => {
    await Contrato.sync()
    return await Contrato.findAll()
}

const QUERY_SEQUELIZE_CONTRATO = {
    listarContratos
}

export default QUERY_SEQUELIZE_CONTRATO