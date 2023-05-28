const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const emailVerificationTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

emailVerificationTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10)
    }
    next()
})

emailVerificationTokenSchema.methods.compareOTP = async function (OTP) {
    return await bcrypt.compare(OTP, this.token)
}

module.exports = mongoose.model("EmailVerificationToken", emailVerificationTokenSchema)
