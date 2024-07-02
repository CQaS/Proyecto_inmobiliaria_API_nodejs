import Inmueble from "./inmueble.models.js";
import Fotos_prop from "./fotos_prop.models.js";

Inmueble.hasMany(Fotos_prop, {
    foreignKey: 'inmueble_id',
    as: 'fotos'
});
Fotos_prop.belongsTo(Inmueble, {
    foreignKey: 'inmueble_id'
});

export {
    Inmueble,
    Fotos_prop
}