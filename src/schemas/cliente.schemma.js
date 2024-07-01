import {
    z
} from 'zod';

const pattern_Nombre = /'^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$'/
const pattern_Direccion = /'^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$'/
const pattern_Datos_envio = /'^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\ -]*$'/
const pattern_soloNumeros = /'^[0-9][0-9,.]*$'/
const pattern_cod_ = /'^[a-zA-Z0-9-]*$'/
const pattern_soloLetras = /'^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$'/

export const ClientesSchema = z.object({
    nom_cliente: z.string({
        required_error: "Requerido",
    }).max(70, "Máximo 70 caracteres").regex(pattern_Nombre, "Formato de nombre inválido"),
    dni_cliente: z.number({
        invalid_type_error: "Debe ser un número",
    }).int("Debe ser un número entero").nullable().optional(),
    rg_cliente: z.string({
        invalid_type_error: "Debe ser un string",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de dirección inválido").nullable().optional(),
    dir_cliente: z.string({
        required_error: "Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de dirección inválido"),
    tel_cliente: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero"),
    email_cliente: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_Nombre, "Formato de email inválido"),
    ciudad_cliente: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_Nombre, "Formato de ciudad inválido"),
    pais_cliente: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_soloLetras, "Formato de país inválido"),
    fechnac: z.string({
        required_error: "Requerido",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    categoria: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_soloLetras, "Formato de categoría inválido"),
});