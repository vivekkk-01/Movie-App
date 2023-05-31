const jwt = require('jsonwebtoken')
const User = require("../models/User")

exports.isAuth = async (req, res, next) => {
    let token = req.headers?.authorization;
    if (!token) return res.status(403).json("You are not authorized")
    token = token.split(" ")[1]
    if (!token) return res.status(403).json("You are not authorized")
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decode) => {
        if (error) return res.status(401).json("You are not authorized.")
        const user = await User.findById(decode.id)
        req.user = user
        next()
    })
}

exports.isAdmin = async (req, res, next) => {
    if (req.user !== "admin") return res.status(401).json("You are not authorized.")
    next()
}

