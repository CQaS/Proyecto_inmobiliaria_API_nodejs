export const esAutentico = (req, res, next) => {

    if (req.session.user) {

        next()

    } else {

        res.status(401).send('NO ESTAS ATENTICADO. POR FAVOR INICA SESSION.')
    }
}