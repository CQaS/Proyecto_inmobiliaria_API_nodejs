import {
    z
} from 'zod';

// Asumiendo que validar_imagen sigue un patrón similar para la validación del campo de imagen
const imagenPattern = /\.(jpg|jpeg|png|gif)$/i; // Patrones de extensión de archivo de imagen comunes

export const FotosSchema = z.object({
    image: z.string({
        required_error: "Requerido",
    }).regex(imagenPattern, "Formato de imagen inválido"),
    inmueble_id: z.number({
        required_error: "Requerido",
    }).int("Debe ser un número entero")
})