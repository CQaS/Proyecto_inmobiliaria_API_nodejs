import {
    z
} from 'zod'
import {
    pattern_Direccion,
    pattern_soloNumeros,
    pattern_cod_,
    pattern_soloLetras
} from '../config.js'

export const nuevoInmueble = z.object({
    dir_inmueble: z.string({
        required_error: "Direccion Inmueble Requerida",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de Dirección inválido"),
    barrio_inmueble: z.string({
        required_error: "Barrio Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de Barrio inválido"),
    bloco_inmueble: z.string({
        required_error: "Bloc Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de bloc inválido"),
    ciudad_inmueble: z.string({
        required_error: "Ciudad Requerida",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de Ciudad inválido"),
    nombre_red: z.string({
        required_error: "Nombre Red Requerida",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de Red inválido"),
    num_apto: z.string({
        required_error: "Numero de apto Requerido",
    }).max(3, "Máximo 3 caracteres"),
    tipo_inmueble: z.string({
        required_error: "Tipo propiedad Requerido",
    }).max(25, "Máximo 25 caracteres").regex(pattern_soloLetras, "Formato de tipo de propiedad inválido"),
    tipo_operacion: z.string({
        required_error: "Tipo operacion Requerido",
    }).max(25, "Máximo 25 caracteres").regex(pattern_soloLetras, "Formato de tipo de operación inválido"),
    sup_total: z.string({
        required_error: "Sup total Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de Sup total inválido"),
    sup_cubierta: z.string({
        required_error: "Sup cubierta Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de Sup cubierta inválido"),
    sup_semicub: z.string({
        required_error: "Sup semiCubierta Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de Sup semiCubierta inválido"),
    cant_plantas: z.number({
        required_error: "Cantidad de plantas Requerido",
    }).int("Cantidad de plantas Debe ser un número entero"),
    cant_dormitorios: z.number({
        required_error: "Cantidad de dormitorios Requerido",
    }).int("Cantidad de dormitorios Debe ser un número entero"),
    cant_banos: z.number({
        required_error: "Cantidad de banios Requerido",
    }).int("Cantidad de banios Debe ser un número entero"),
    cochera: z.boolean().nullable().optional(),
    cochera_rotativa: z.boolean().nullable().optional(),
    cod_referencia: z.string({
        required_error: "Cod Ref Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_cod_, "Formato de código ref inválido"),
    condicion: z.string({
        required_error: "Condicion Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_soloLetras, "Formato de condición inválido"),
    expensas: z.boolean().nullable().optional(),
    descripcion: z.string({
        required_error: "Descripcion Requerido",
    }),
    clave_puerta_ingreso: z.string({
        required_error: "clave puerta Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_cod_, "Formato de clave puerta inválido"),
    clave_puerta_ingreso2: z.string({
        required_error: "clave puerta 2 Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_cod_, "Formato de clave puerta 2 inválido"),
    clave_wifi: z.string({
        required_error: "WiFi Requerido",
    }).max(50, "Máximo 50 caracteres"),
    tipo_servicio: z.string().max(45, "Máximo 45 caracteres").nullable().optional().default('SD'),
    cliente_id: z.number({
        required_error: "ID Cliente Requerido",
    }).int("Debe ser un número entero ID Cliente"),
    valor_inmueble: z.string({
        required_error: "Valor Inmueble Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de Valor Inmueble inválido"),
    exclusividad: z.boolean().nullable().optional(),
    habitac_maxima: z.number({
        required_error: "Hab Max Requerido",
    }).int("Debe ser un número entero Hab Max"),
    latitud: z.string({
        required_error: "Lat Requerido",
    }).max(100, "Máximo 100 caracteres").default('0.0'),
    longitud: z.string({
        required_error: "Long Requerido",
    }).max(100, "Máximo 100 caracteres").default('0.0')
})