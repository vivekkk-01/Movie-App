const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require('cors')
const morgan = require("morgan")

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(morgan())

const userRoutes = require("./routes/user")

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to the Database.")
}).catch(err => {
    console.log("Error while connecting to database.", err)
})