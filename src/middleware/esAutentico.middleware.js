export const esAutentico = (req, res, next) => {

    if (req.session.user) {

        next()

    } else {

        res.status(401).json({
            Error: 'NO ESTAS ATENTICADO. POR FAVOR INICA SESSION!'
        })
    }
}