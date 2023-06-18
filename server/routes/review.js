const express = require("express")
const routes = express.Router()
const { body } = require("express-validator")
const auth = require('../middlewares/auth')
const reviewControllers = require('../controllers/review')

routes.post("/:movieId", auth.isAuth, body("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating should be between 0 or 10."), reviewControllers.postReview)

routes.put("/:reviewId", auth.isAuth, body("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating should be between 0 or 10."), reviewControllers.updateReview)

routes.delete("/:reviewId", auth.isAuth, reviewControllers.deleteReview)

routes.get("/get-reviews-by-movie/:movieId", auth.isAuth, reviewControllers.getReviews)

module.exports = routes;
