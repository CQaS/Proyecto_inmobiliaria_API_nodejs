export const HOST = 'localhost'
export const USER = 'root'
export const PASSWORD = ''
export const DATABASE = 'inmobiliaria'
export const PORT = 3000

/* VALIDADORES */

export const pattern_Nombre = /^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$/
export const pattern_Direccion = /^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$/;
export const pattern_Datos_envio = /^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\ -]*$/
export const pattern_soloNumeros = /^[0-9][0-9,.]*$/
export const pattern_cod_ = /^[a-zA-Z0-9-]*$/
export const pattern_soloLetras = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$/
export const pattern_imagen = /\.(jpg|jpeg|png|gif)$/i