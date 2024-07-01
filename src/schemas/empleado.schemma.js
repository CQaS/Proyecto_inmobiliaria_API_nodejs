import {
    z
} from 'zod';

const pattern_Nombre = /'^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$'/
const pattern_Direccion = /'^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$'/
const pattern_Datos_envio = /'^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\ -]*$'/
const pattern_soloNumeros = /'^[0-9][0-9,.]*$'/
const pattern_cod_ = /'^[a-zA-Z0-9-]*$'/
const pattern_soloLetras = /'^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$'/

export const EmpleadosSchema = z.object({
    nom_empleado: z.string({
        required_error: "Requerido",
    }).max(70, "Máximo 70 caracteres").regex(pattern_Nombre, "Formato de nombre inválido"),
    dni_empleado: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero"),
    tel_empleado: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero"),
    dir_empleado: z.string({
        required_error: "Requerido",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de dirección inválido"),
    email_empleado: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_Nombre, "Formato de email inválido"),
    nom_puesto: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_soloLetras, "Formato de nombre de puesto inválido"),
})