export const validarSchemmaFoto = (schema) => (req, res, next) => {
    try {
        console.log(req.body)
        const {
            fotos,
            ...inmuebleData
        } = req.body
        schema.parse(fotos)
        next()
    } catch (e) {
        console.log(e.errors.map((ERR) => ERR.message))
        return res.status(400).json(e.errors.map((ERR) => ERR.message))
    }
}