import {
    z
} from 'zod';

import {
    pattern_Direccion,
    pattern_soloNumeros
} from '../config.js'

export const ContratoSchema = z.object({
    tipo_operacion: z.string().max(45, "Máximo 45 caracteres").nullable().optional().default('S/D'),
    fecha_contrato: z.string({
        required_error: "fecha contrato Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)").optional(),
    fecha_ing: z.string({
        required_error: "fecha Ing Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    fecha_salida: z.string({
        required_error: "fecha salida Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    cant_dias: z.number({
        required_error: "cantidad de dias Requerido",
    }).int("Debe ser un número entero"),
    cliente_id: z.number({
        required_error: "ID cliente Requerido",
    }).int("Debe ser un número entero"),
    valor_total: z.string({
        required_error: "valor total Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de número inválido"),
    monto_reserva: z.string({
        required_error: "monto de reserva Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de número inválido"),
    fecha_reserva: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)").optional(),
    datos_envio: z.string({
        required_error: "datos envio Requerido",
    }).max(250, "Máximo 250 caracteres").regex(pattern_Direccion, "Formato de datos de envío inválido"),
    inmueble_id: z.number({
        required_error: "ID de inmueble Requerido",
    }).int("Debe ser un número entero")
})