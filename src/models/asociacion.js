import Inmueble from "./inmueble.models.js"
import Fotos_prop from "./fotos_prop.models.js"
import Contrato from "./contrato.models.js"
import Cliente from "./cliente.models.js"
import Empleado from "./empleado.models.js"
import AuthUsers from "./authusers.models.js"
import Block from "./block.models.js"

/* INMUEBLE -> FOTOS */
Inmueble.hasMany(Fotos_prop, {
    foreignKey: 'inmueble_id',
    as: 'fotos'
})
Fotos_prop.belongsTo(Inmueble, {
    foreignKey: 'inmueble_id'
})

/* INMUEBLE -> CONTRATOS */
// Un inmueble puede tener muchos contratos
Inmueble.hasMany(Contrato, {
    foreignKey: 'inmueble_id',
    as: 'contratos'
});

// Un contrato pertenece a un inmueble
Contrato.belongsTo(Inmueble, {
    foreignKey: 'inmueble_id',
    as: 'inmueble'
});

/* CLIENTE -> CONTRATOS */
// Un cliente puede tener muchos contratos
Cliente.hasMany(Contrato, {
    foreignKey: 'cliente_id',
    as: 'contratos'
});

// Un contrato pertenece a un cliente
Contrato.belongsTo(Cliente, {
    foreignKey: 'cliente_id',
    as: 'cliente'
});

// Un cliente puede tener muchos inmuebles
Cliente.hasMany(Inmueble, {
    foreignKey: 'cliente_id',
    as: 'inmuebles'
});

// Un inmueble pertenece a un cliente
Inmueble.belongsTo(Cliente, {
    foreignKey: 'cliente_id',
    as: 'cliente'
})

export {
    Inmueble,
    Fotos_prop,
    Contrato,
    Cliente,
    Empleado,
    AuthUsers,
    Block
}