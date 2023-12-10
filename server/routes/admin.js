const express = require("express");
const routes = express.Router()
const { isAuth, isAdmin } = require("../middlewares/auth");
const { getAppInfo } = require("../controllers/admin");

routes.get("/app-info", isAuth, isAdmin, getAppInfo)

module.exports = routes;