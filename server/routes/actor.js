const express = require("express")
const routes = express.Router()
const { body } = require('express-validator')
const actorControllers = require("../controllers/actor");
const { uploadImage, validateImage } = require("../middlewares/multer");
const { isAuth, isAdmin } = require("../middlewares/auth");

routes.post("/", isAuth, isAdmin, uploadImage.single("avatar"), validateImage, [body("name").trim().not().isEmpty().withMessage("Name is required."), body("about").trim().not().isEmpty().withMessage("About is required field."), body("gender").trim().not().isEmpty().withMessage("Gender is required.")], actorControllers.createActor)

routes.put("/:actorId", isAuth, isAdmin, uploadImage.single("image"), validateImage, [body("name").trim().not().isEmpty().withMessage("Name is required."), body("about").trim().not().isEmpty().withMessage("About is required field."), body("gender").trim().not().isEmpty().withMessage("Gender is required.")], actorControllers.updateActor)

routes.delete("/:actorId", isAuth, isAdmin, actorControllers.deleteActor)

routes.get("/search", actorControllers.searchActor)

routes.get("/latest-uploads", actorControllers.getLatestActors)

routes.get("/:actorId", actorControllers.getSingleActor)

module.exports = routes;
