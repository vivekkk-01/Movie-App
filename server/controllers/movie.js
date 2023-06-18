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

exports.updateMovie = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(401).json(error.array()[0].msg)
        }
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId)
        if (!movie) return res.status(404).json("No Movie Found!")
        if (req.body.director) {
            if (!isValidObjectId(req.body.director)) return res.status(403).json("Enter a valid Director, please.")
        }
        if (req.body.writers) {
            req.body.writers.forEach(writerId => {
                if (!isValidObjectId(writerId)) return res.status(403).json("Enter a valid Writer, please.")
            });
        }
        if (req.file) {
            const posterPublic_id = movie.poster?.public_id
            if (posterPublic_id) {
                const { result } = await cloudinary.uploader.destroy(posterPublic_id)
                if (result !== "ok") return res.status(500).json("Couldn't update the movie poster at the moment.")
            } else {
                return;
            }
            const filePath = path.join(`public/upload/images/${req.file.filename}`)
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
            req.body.poster = finalPoster;
        }
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, { ...req.body }, { new: true })
        return res.json({ _id: updatedMovie._id, title: updatedMovie.title, genres: updatedMovie.genres, poster: updatedMovie.poster, status: updatedMovie.status })
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId)
        if (!movie) return res.status(404).json("No Movie Found!")
        if (movie?.poster) {
            const { public_id } = movie.poster;
            const { result } = await cloudinary.uploader.destroy(public_id)
            if (result !== "ok") return res.status(500).json("Couldn't delete the movie at the moment.")
        }

        const { public_id } = movie.trailer
        const { result } = await cloudinary.v2.uploader.destroy(public_id, { resource_type: "video" })
        if (result !== "ok") return res.status(500).json("Couldn't delete the movie at the moment.")
        await Movie.findByIdAndDelete(movieId)
        return res.json("Movie Deleted Successfully!")
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.getMovies = async (req, res) => {
    try {
        const { pageNo = 0, limit = 10 } = req.query;
        const movies = await Movie.find().sort({ createdAt: -1 }).skip(+pageNo * +limit).limit(+limit)
        return res.json(movies)
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.getMovieData = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId).populate("director").populate("writers cast.actor")
        if (!movie) return res.status(404).json("Not Found")
        return res.json({
            _id: movie._id,
            title: movie.title,
            storyLine: movie.storyLine,
            tags: movie.tags,
            genres: movie.genres,
            poster: movie.poster,
            releaseDate: movie.releaseDate,
            status: movie.status,
            type: movie.type,
            language: movie.language,
            director: movie.director,
            writers: movie.writers,
            cast: movie.cast.map(c => {
                return {
                    _id: c._id,
                    profile: c.actor,
                    roleAs: c.roleAs,
                    leadActor: c.leadActor
                }
            })
        })
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.searchMovies = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) return;
        const movies = await Movie.find({ title: { $regex: title, $options: "i" } })
        return res.json(movies?.map(movie => {
            return {
                _id: movie._id,
                title: movie.title,
                poster: movie.poster,
                status: movie.status,
                genres: movie.genres
            }
        }))
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}
