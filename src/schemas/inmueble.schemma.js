import {
    z
} from 'zod'

export const nuevoInmueble = z.object({
    dir_inmueble: z.string({
        required_error: 'Direccion Requerida'
    })
})