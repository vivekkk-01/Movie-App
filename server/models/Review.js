const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    movie: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    content: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
    },
}, { timestamps: true, },)

module.exports = mongoose.model("Review", reviewSchema)
