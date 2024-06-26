const Movie = require("../models/Movie");
const Review = require("../models/Review");
const { validationResult } = require("express-validator")

exports.postReview = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(403).json(err.array()[0].msg)
        }
        const { movieId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user._id
        const movie = await Movie.findOne({ _id: movieId, status: "public" })
        if (!movie) return res.status(404).json("Movie not found!")

        const isReviewed = await Review.findOne({ owner: userId, movie: movieId })
        if (isReviewed) return res.status(403).json("You have already reviewed this movie.")

        const newReview = await Review.create({
            owner: userId,
            movie: movie.id,
            content,
            rating
        })
        movie.reviews.push(newReview)
        await movie.save()
        const response = await Review.aggregate([
            {
                $lookup: {
                    from: "Review",
                    localField: "rating",
                    foreignField: "_id",
                    as: "avgRating"
                },
            },
            {
                $match: {
                    movie: movie._id
                }
            },
            {
                $group: {
                    _id: null,
                    ratingAvg: {
                        $avg: "$rating"
                    },
                    reviewCount: {
                        $sum: 1
                    }
                }
            }
        ])

        let reviews = {}

        if (response.length > 0) {
            reviews.ratingAvg = response[0].ratingAvg.toFixed(1)
            reviews.reviewCount = response[0].reviewCount
        }
        return res.status(201).json({ message: "You have successfully added your review.", reviews })
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.updateReview = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(403).json(err.array()[0].msg)
        }
        const { reviewId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user._id
        const review = await Review.findOne({ owner: userId, _id: reviewId })
        if (!review) return res.status(404).json("Review not found!")
        review.content = content;
        review.rating = rating;
        await review.save()
        return res.json("You have successfully updated your review.")
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id
        const review = await Review.findOne({ owner: userId, _id: reviewId })
        if (!review) return res.status(404).json("Review not found!")
        const movie = await Movie.findOne({ _id: review.movie })
        if (!movie) return res.status(404).json("Movie not found!")
        movie.reviews = movie.reviews.filter(rid => rid.toString() !== review._id.toString())
        await movie.save()
        await Review.findByIdAndRemove(reviewId)
        return res.json("You have successfully deleted your review.")
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}

exports.getReviews = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!movieId) return res.status(404).json("Movie not found!")
        const reviews = await Review.find({ movie: movieId }).populate({ path: "owner", select: "name" })
        res.json(reviews)
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
}