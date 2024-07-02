import SDM from "../db/sequelize_db.js";
const {
    sequelize,
    DataTypes,
    Model
} = SDM

class Inmueble extends Model {}

Inmueble.init({
    id_inmueble: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dir_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    barrio_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bloco_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_red: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_apto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_operacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sup_total: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sup_cubierta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sup_semicub: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cant_plantas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cant_dormitorios: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cant_banos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cochera: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    cochera_rotativa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    cod_referencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condicion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expensas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    clave_puerta_ingreso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clave_puerta_ingreso2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clave_wifi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_servicio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'SD',
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_inmueble: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    exclusividad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    habitac_maxima: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    latitud: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0.0',
    },
    longitud: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0,0',
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: "inmueble",
    tableName: "inmueble",
    timestamps: false
})

export default Inmueble