const express = require("express")
const routes = express.Router()
const { body } = require("express-validator")
const auth = require("../middlewares/auth")

const userControllers = require("../controllers/user")

routes.post("/register", [
    body("name").trim().not().isEmpty().withMessage("Name is required."),
    body("email").trim().not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Enter a valid email address."),
    body("password").not().isEmpty().withMessage("Password is required.").isLength({ max: 20, min: 8 }).withMessage("Password should be 8 to 20 characters long."),
], userControllers.registerUser)

routes.post("/verify-email", userControllers.verifyEmail)

routes.post("/resend-otp", userControllers.resendOTP)

routes.post("/forgot-password", userControllers.forgotPassword)

routes.post("/reset-password", body("password").not().isEmpty().withMessage("Password is required.").isLength({ max: 20, min: 8 }).withMessage("Password should be 8 to 20 characters long."), userControllers.resetPassword)

routes.post("/login", userControllers.loginUser)

routes.get("/is-auth", auth.isAuth, userControllers.isAuth)

module.exports = routes;