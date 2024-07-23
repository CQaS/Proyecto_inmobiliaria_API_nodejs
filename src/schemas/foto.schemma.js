import {
    z
} from 'zod'

import {
    pattern_imagen
} from '../config.js'

export const fotosSchema = z.object({
    image: z.string({
        required_error: "Requerido",
    }).regex(pattern_imagen, "Formato de imagen inválido"),
    inmueble_id: z.number().int("Debe ser un número entero").optional()

}).passthrough()