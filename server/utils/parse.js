const jsonParseMethod = (req, res, next) => {
    if (req.body.trailer) req.body.trailer = JSON.parse(req.body.trailer)
    if (req.body.poster) req.body.poster = JSON.parse(req.body.poster)
    if (req.body.cast) req.body.cast = JSON.parse(req.body.cast)
    if (req.body.tags) req.body.tags = JSON.parse(req.body.tags)
    if (req.body.genres) req.body.genres = JSON.parse(req.body.genres)
    if (req.body.writers) req.body.writers = JSON.parse(req.body.writers)
    next()
}
module.exports = jsonParseMethod;