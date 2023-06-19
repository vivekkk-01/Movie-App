const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const routes = express.Router()
const { body } = require('express-validator')

const movieControllers = require("../controllers/movie");
const { uploadVideo, validateVideo, uploadImage, validatePoster, validateUpdatePoster } = require("../middlewares/multer");
const genres = require("../utils/genres");
const { isValidObjectId } = require("mongoose");
const jsonParseMethod = require("../utils/parse");

routes.post("/upload-trailer", isAuth, isAdmin, uploadVideo.single("video"), validateVideo, movieControllers.uploadTrailer)

routes.post("/create", isAuth, isAdmin, uploadImage.single("poster"), validatePoster, jsonParseMethod, [
    body("title").trim().not().isEmpty().withMessage("Title is required."),
    body("storyLine").trim().not().isEmpty().withMessage("Story Line is required."),
    body("director").trim().not().isEmpty().withMessage("Director is required."),
    body("releaseDate").trim().not().isEmpty().withMessage("Release Date is required."),
    body("status").isIn(["public", "private"]).withMessage("Status should be public or private."),
    body("type").trim().not().isEmpty().withMessage("Movie Type is required."),
    body("genres").isArray().custom(values => {
        for (let g of values) {
            if (!genres.includes(g)) throw Error("Invalid Genre!")
        }
        return true;
    }),
    body("tags").isArray().custom(tags => {
        for (let tag of tags) {
            if (typeof tag !== 'string') throw Error("Enter a valid Tag!")
        }
        return true;
    }),
    body("cast").isArray().custom(cast => {
        for (let c of cast) {
            if (!isValidObjectId(c.actor)) throw Error("Cast is invalid!")
            if (!c.roleAs.trim()) throw Error("Cast role is missing!")
            if (typeof c.leadActor !== "boolean") throw Error("Lead Actor is Missing!")
        }
        return true;
    }),
    body("writers").isArray().custom(writers => {
        for (let writerId of writers) {
            if (!isValidObjectId(writerId)) throw Error("Writer is invalid!")
        }
        return true;
    }),
    body("language").trim().not().isEmpty().withMessage("Language is required."),
], movieControllers.createMovie)

routes.patch("/:movieId", isAuth, isAdmin, uploadImage.single("poster"), validateUpdatePoster, jsonParseMethod, [
    body("title").optional().trim().not().isEmpty().withMessage("Title is required."),
    body("storyLine").optional().trim().not().isEmpty().withMessage("Story Line is required."),
    body("director").optional().trim().not().isEmpty().withMessage("Director is required."),
    body("releaseDate").optional().trim().not().isEmpty().withMessage("Release Date is required."),
    body("status").optional().isIn(["public", "private"]).withMessage("Status should be public or private."),
    body("type").optional().trim().not().isEmpty().withMessage("Movie Type is required."),
    body("genres").optional().isArray().custom(values => {
        for (let g of values) {
            if (!genres.includes(g)) throw Error("Invalid Genre!")
        }
        return true;
    }),
    body("tags").optional().isArray().custom(tags => {
        for (let tag of tags) {
            if (typeof tag !== 'string') throw Error("Enter a valid Tag!")
        }
        return true;
    }),
    body("cast").optional().isArray().custom(cast => {
        for (let c of cast) {
            if (!isValidObjectId(c.actor)) throw Error("Cast is invalid!")
            if (!c.roleAs.trim()) throw Error("Cast role is missing!")
            if (typeof c.leadActor !== "boolean") throw Error("Lead Actor is Missing!")
        }
        return true;
    }),
    body("writers").optional().isArray().custom(writers => {
        for (let writerId of writers) {
            if (!isValidObjectId(writerId)) throw Error("Writer is invalid!")
        }
        return true;
    }),
    body("language").optional().trim().not().isEmpty().withMessage("Language is required.")
], movieControllers.updateMovie)

routes.delete("/:movieId", isAuth, isAdmin, movieControllers.deleteMovie)

routes.get("/movie-data/:movieId", isAuth, isAdmin, movieControllers.getMovieData)

routes.get("/", isAuth, isAdmin, movieControllers.getMovies)

routes.get("/search", isAuth, isAdmin, movieControllers.searchMovies)

// For Normal Users

routes.get("/latest-uploads", movieControllers.getLatestUploads)

routes.get("/single/:movieId", movieControllers.getSingleMovie)

routes.get("/related/:movieId", movieControllers.getRelatedMovies)

routes.get("/top-rated", movieControllers.getTopRatedMovies)

module.exports = routes;
