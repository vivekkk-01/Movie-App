const express = require("express");
const routes = express.Router()
const { isAuth, isAdmin } = require("../middlewares/auth");
const { getAppInfo, getMostRated } = require("../controllers/admin");

routes.get("/app-info", isAuth, isAdmin, getAppInfo)

routes.get("/most-rated", isAuth, isAdmin, getMostRated)

module.exports = routes;