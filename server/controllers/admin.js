const Movie = require("../models/Movie")
const Review = require("../models/Review")
const User = require("../models/User")

exports.getAppInfo = async (req, res) => {
    try {
        const movieCount = await Movie.countDocuments()
        const reviewCount = await Review.countDocuments()
        const userCount = await User.countDocuments()
        return res.json({ movieCount, reviewCount, userCount })
    } catch (error) {
        return res.status(error.http_code ? error.http_code : 500).json(error.message ? error.message : "Something went wrong, please try again!")
    }
} 