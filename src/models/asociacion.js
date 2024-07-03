import Inmueble from "./inmueble.models.js";
import Fotos_prop from "./fotos_prop.models.js";
import Contrato from "./contrato.models.js";

/* INMUEBLE -> FOTOS */
Inmueble.hasMany(Fotos_prop, {
    foreignKey: 'inmueble_id',
    as: 'fotos'
});
Fotos_prop.belongsTo(Inmueble, {
    foreignKey: 'inmueble_id'
});

/* INMUEBLE -> CONTRATOS */
Inmueble.hasMany(Contrato, {
    foreignKey: 'inmueble_id'
});
Contrato.belongsTo(Inmueble, {
    foreignKey: 'inmueble_id'
});

export {
    Inmueble,
    Fotos_prop,
    Contrato
}