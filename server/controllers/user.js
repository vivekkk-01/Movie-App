const User = require("../models/User")
const EmailVerificationToken = require("../models/EmailVerificationToken")
const { validationResult } = require("express-validator")
const sgMail = require("@sendgrid/mail")

exports.registerUser = async (req, res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json(error.array()[0].msg)
        }
        const { email } = req.body;
        const isUser = await User.findOne({ email })
        if (isUser) {
            return res.status(400).json("User with that email address already exists.")
        }
        const user = await User.create({ ...req.body })

        let OTP = ""
        for (let i = 0; i < 5; i++) {
            const randomVal = Math.round(Math.random() * 9)
            OTP += randomVal;
        }

        await EmailVerificationToken.create({
            user: user._id,
            token: OTP
        })

        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

        const msg = {
            from: "chimnanivivek14@gmail.com",
            to: user.email,
            subject: "Email Verification",
            html: `Your verification OTP is ${OTP}`
        }

        await sgMail.send(msg)

        return res.status(201).json("OTP successfully sent to your email address.")
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again.")
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { userId, OTP } = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json("Invalid user.")
        }
        if (user.isVerified) {
            return res.status(400).json("User already verified.")
        }

        const token = await EmailVerificationToken.findOne({ user: userId })
        if (!token) {
            return res.status(400).json("User not found.")
        }

        const isMatched = await token.compareOTP(OTP)
        if (!isMatched) return res.status(400).json("Enter a valid OTP, please.")

        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

        const msg = {
            from: "chimnanivivek14@gmail.com",
            to: user.email,
            subject: "Welcome",
            html: "Welcome to our app, and thanks for choosing us."
        }

        await sgMail.send(msg)
        user.isVerified = true
        await user.save()
        await EmailVerificationToken.findOneAndDelete({ user: userId })
        return res.json("You are now verified.")
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again.")
    }
}

exports.resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json("Invalid user.")
        }

        if (user.isVerified) {
            return res.status(400).json("User already verified.")
        }

        const token = await EmailVerificationToken.findOne({ user: userId })
        if (token) {
            return res.status(400).json("You can not ask for new OTP within just 1 hour of sending an OTP.")
        }

        let OTP = ""
        for (let i = 0; i < 5; i++) {
            const randomVal = Math.round(Math.random() * 9)
            OTP += randomVal;
        }

        await EmailVerificationToken.create({
            user: user._id,
            token: OTP
        })

        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

        const msg = {
            from: "chimnanivivek14@gmail.com",
            to: user.email,
            subject: "Email Verification",
            html: `Your verification OTP is ${OTP}`
        }

        await sgMail.send(msg)

        return res.status(201).json("A new OTP successfully sent to your email address.")

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again.")
    }
}
