const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: Object,
        url: String,
        public_id: String
    },
}, { timestamps: true, },)

actorSchema.index({ name: "text" })

module.exports = mongoose.model("Actor", actorSchema)
