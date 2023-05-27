const User = require("../models/User")
const { validationResult } = require("express-validator")

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
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again.")
    }
}