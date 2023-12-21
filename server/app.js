require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan());

const userRoutes = require("./routes/user");
const actorRoutes = require("./routes/actor");
const movieRoutes = require("./routes/movie");
const reviewRoutes = require("./routes/review");
const adminRoutes = require("./routes/admin");

app.use("/api/users", userRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.log(err.message, "Error");
  const errMessage = err
    ? err
    : err.message
    ? err.message
    : "Something went wrong, please try again!";
  const errStatus = err.status ? err.status : 500;
  res.status(errStatus).json(errMessage);
});

app.use("/*", (req, res) => {
  return res.status(404).json("Not Found!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the Database.");
  })
  .catch((err) => {
    console.log("Error while connecting to database.", err);
  });
