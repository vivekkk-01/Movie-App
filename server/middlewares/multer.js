const multer = require('multer')
const storage = multer.memoryStorage({})
const fs = require("fs")
const path = require('path')

const fileFilter = (req, file, cb) => {
    cb(null, true)
}

exports.uploadImage = multer({ storage, fileFilter })

exports.validateImage = (req, res, next) => {
    if (req.file && !req.file.mimetype.startsWith("image")) {
        return res.status(403).json("Please provide an image.")
    }
    if (req.file && req.file.size > 4000000) {
        return res.status(403).json("Image size should not be more than 4 megabytes.")
    }
    if (req.file) {
        req.file.filename = `user-${Date.now()}-${req.file.originalname}`
        fs.writeFile(path.join(`public/upload/images/${req.file.filename}`), req.file.buffer, (err) => {
            if (err) {
                next(err)
            }
        })
    }
    next()
}
