const mongoose = require("mongoose");
const genres = require("../utils/genres");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    storyLine: {
        type: String,
        required: true,
        trim: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: "Actor",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["public", "private"]
    },
    type: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true,
        enum: [...genres]
    },
    tags: {
        type: [String],
        required: true
    },
    cast: [
        {
            actor: {
                type: Schema.Types.ObjectId,
                ref: "Actor",
            },
            roleAs: String,
            leadActor: Boolean
        }
    ],
    writers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Actor",
        }
    ],
    poster: {
        type: Object,
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        responsive: [URL],
        required: true
    },
    trailer: {
        type: Object,
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    language: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Movie", movieSchema)
