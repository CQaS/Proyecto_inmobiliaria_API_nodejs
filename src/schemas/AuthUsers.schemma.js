import {
    z
} from 'zod'

import {
    usernamePattern,
    namePattern,
    emailPattern
} from '../config.js'

export const authUserSchema = z.object({
    username: z.string({
        required_error: "Username Requerida",
    }).max(150, "Máximo 150 caracteres").regex(usernamePattern, "Formato de nombre de usuario inválido"),
    first_name: z.string()
        .max(30, "Máximo 30 caracteres")
        .regex(namePattern, "Formato de nombre inválido")
        .optional(),
    last_name: z.string()
        .max(30, "Máximo 30 caracteres")
        .regex(namePattern, "Formato de apellido inválido")
        .optional(),
    email: z.string()
        .email("Formato de email inválido")
        .max(254, "Máximo 254 caracteres")
        .regex(emailPattern, "Formato de email inválido")
        .optional(),
    password: z.string({
            required_error: "Password Requerido",
        })
        .max(128, "Máximo 128 caracteres"),
    is_superuser: z.boolean().default(false),
    is_staff: z.boolean().default(false),
    is_active: z.boolean().default(true),
    last_login: z.date().nullable().default(null),
    date_joined: z.date().default(() => new Date())
})