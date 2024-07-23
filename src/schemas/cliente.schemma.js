const currentDate = new Date()
import {
    z
} from 'zod'
import {
    pattern_Nombre,
    pattern_Direccion,
    pattern_soloLetras,
    pattern_email,
    pattern_fecha,
    edad_minima
} from '../config.js'
const mayorMenor = new Date(currentDate.getFullYear() - edad_minima, currentDate.getMonth(), currentDate.getDate())

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
    }).max(45, "Máximo 45 caracteres").regex(pattern_email, "Formato de email inválido"),
    ciudad_cliente: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_Nombre, "Formato de ciudad inválido"),
    pais_cliente: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_soloLetras, "Formato de país inválido"),
    fechnac: z.string({
            required_error: "Requerido",
        })
        .regex(pattern_fecha, "Formato de fecha inválido (YYYY-MM-DD)")
        .refine(fecha => {
            const fechaDeNacimiento = new Date(fecha)
            return fechaDeNacimiento <= mayorMenor
        }, {
            message: "Debe ser mayor de edad.",
        }),
    categoria: z.string({
        required_error: "Requerido",
    }).max(45, "Máximo 45 caracteres").regex(pattern_soloLetras, "Formato de categoría inválido"),
})