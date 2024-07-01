import {
    z
} from 'zod';

const pattern_Nombre = /'^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$'/
const pattern_Direccion = /'^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$'/
const pattern_Datos_envio = /'^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\ -]*$'/
const pattern_soloNumeros = /'^[0-9][0-9,.]*$'/
const pattern_cod_ = /'^[a-zA-Z0-9-]*$'/
const pattern_soloLetras = /'^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$'/

export const ContratoSchema = z.object({
    tipo_operacion: z.string().max(45, "Máximo 45 caracteres").nullable().optional().default('S/D'),
    fecha_contrato: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    fecha_ing: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    fecha_salida: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    cant_dias: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero"),
    cliente_id: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero"),
    valor_total: z.string({
        required_error: "Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de número inválido"),
    monto_reserva: z.string({
        required_error: "Requerido",
    }).max(15, "Máximo 15 caracteres").regex(pattern_soloNumeros, "Formato de número inválido"),
    fecha_reserva: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    datos_envio: z.string({
        required_error: "Requerido",
    }).max(250, "Máximo 250 caracteres").regex(pattern_Direccion, "Formato de datos de envío inválido"),
    inmueble_id: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero")
})