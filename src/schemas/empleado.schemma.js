import {
    z
} from 'zod'

import {
    pattern_Nombre,
    pattern_Direccion,
    pattern_soloNumeros,
    pattern_email
} from '../config.js'

export const EmpleadosSchema = z.object({
    nom_empleado: z.string({
        required_error: "Nombre de empleado requerido",
    }).max(70, "Máximo 70 caracteres").regex(pattern_Nombre, "Formato de nombre inválido"),
    dni_empleado: z.number({
        required_error: "DNI de empleado requerido",
    }).int().positive("DNI debe ser un número positivo"),
    tel_empleado: z.string({
        required_error: "Teléfono de empleado requerido",
    }).regex(pattern_soloNumeros, "Formato de teléfono inválido"),
    dir_empleado: z.string({
        required_error: "Dirección de empleado requerida",
    }).max(100, "Máximo 100 caracteres").regex(pattern_Direccion, "Formato de dirección inválido"),
    email_empleado: z.string({
        required_error: "Correo electrónico de empleado requerido",
    }).email("Formato de correo electrónico inválido").regex(pattern_email, "Formato de correo electrónico inválido"),
    nom_puesto: z.string({
        required_error: "Nombre del puesto requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_Nombre, "Formato de nombre de puesto inválido")
})