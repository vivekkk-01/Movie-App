const cloudinary = require("cloudinary")
const { unlink } = require("fs")
const { isValidObjectId } = require("mongoose")
const path = require('path')
const Movie = require("../models/Movie")
const { validationResult } = require("express-validator")

exports.uploadTrailer = async (req, res) => {
    try {
        const filePath = path.join(`public/upload/videos/${req.file.filename}`)
        const { secure_url, public_id } = await cloudinary.v2.uploader.upload(filePath, { resource_type: "video" })
        unlink(filePath, (err) => {
            if (err) {
                next(err)
            }
        })
        return res.json({ secure_url, public_id })
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.createMovie = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(401).json(error.array()[0].msg)
        }
        const { body } = req;
        const filePath = path.join(`public/upload/images/${req.file.filename}`)
        const { genres, title, storyLine, director, releaseDate, trailer, status, type, tags, cast, writers, language, } = body;
        if (!isValidObjectId(director)) return res.status(403).json("Enter a valid Director, please.")
        writers.forEach(writerId => {
            if (!isValidObjectId(writerId)) return res.status(403).json("Enter a valid Writer, please.")
        });

        const { secure_url: url, public_id, responsive_breakpoints } = await cloudinary.v2.uploader.upload(filePath, {
            transformation: {
                width: 1280,
                height: 720,
            },
            responsive_breakpoints: {
                create_derived: true,
                max_width: 640,
                max_images: 3
            }
        })
        unlink(filePath, (err) => {
            if (err) {
                next(err)
            }
        })
        const breakpoints = responsive_breakpoints[0].breakpoints
        const finalPoster = { url, public_id, responsive: [] }
        breakpoints.forEach(image => {
            finalPoster.responsive.push(image.secure_url)
        });

        const movie = await Movie.create({
            genres, title, storyLine, director, releaseDate, trailer, status, type, tags, cast, writers, language, poster: finalPoster
        })
        res.status(201).json(movie)
    } catch (error) {
        console.log(error)
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}
