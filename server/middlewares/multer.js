const multer = require('multer')
const storage = multer.memoryStorage({})
const fs = require("fs")
const path = require('path')

const imageFileFilter = (req, file, cb) => {
    cb(null, true)
}

const videoFileFilter = (req, file, cb) => {
    cb(null, true)
}

exports.uploadImage = multer({ storage, fileFilter: imageFileFilter })

exports.uploadVideo = multer({ storage, fileFilter: videoFileFilter })

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

exports.validateVideo = (req, res, next) => {
    if (!req.file) {
        return res.status(403).json("Please provide a video file.")
    }
    if (req.file && !req.file.mimetype.startsWith("video")) {
        return res.status(403).json("Please provide a video.")
    }
    if (req.file && req.file.size > 100000000) {
        return res.status(403).json("Video size should not be more than 100 megabytes.")
    }
    if (req.file) {
        req.file.filename = `user-${Date.now()}-${req.file.originalname}`
        fs.writeFile(path.join(`public/upload/videos/${req.file.filename}`), req.file.buffer, (err) => {
            if (err) {
                next(err)
            }
        })
    }
    next()
}

exports.validatePoster = (req, res, next) => {
    if (req.file && !req.file.mimetype.startsWith("image")) {
        return res.status(403).json("Please provide a poster.")
    }
    if (req.file && req.file.size > 5000000) {
        return res.status(403).json("Image size should not be more than 5 megabytes.")
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

exports.validateUpdatePoster = (req, res, next) => {
    if (req.file && !req.file.mimetype.startsWith("image")) {
        return res.status(403).json("Please provide a poster.")
    }
    if (req.file && req.file.size > 5000000) {
        return res.status(403).json("Image size should not be more than 5 megabytes.")
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
