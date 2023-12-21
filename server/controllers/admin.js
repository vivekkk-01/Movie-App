const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");

exports.getAppInfo = async (req, res) => {
  try {
    const movieCount = await Movie.countDocuments();
    const reviewCount = await Review.countDocuments();
    const userCount = await User.countDocuments();
    return res.json({ movieCount, reviewCount, userCount });
  } catch (error) {
    return res
      .status(error.http_code ? error.http_code : 500)
      .json(
        error.message
          ? error.message
          : "Something went wrong, please try again!"
      );
  }
};

exports.getMostRated = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "Movie",
          localField: "reviews",
          foreignField: "_id",
          as: "topRated",
        },
      },
      {
        $match: {
          status: { $eq: "public" },
          $expr: { $gt: [{ $size: "$reviews" }, 0] },
        },
      },
      {
        $project: {
          title: 1,
        },
      },
      {
        $sort: {
          reviewCount: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const result = await Promise.all(
      movies.map(async (m) => {
        const response = await Review.aggregate([
          {
            $lookup: {
              from: "Review",
              localField: "rating",
              foreignField: "_id",
              as: "avgRating",
            },
          },
          {
            $match: {
              movie: m._id,
            },
          },
          {
            $group: {
              _id: null,
              ratingAvg: {
                $avg: "$rating",
              },
              reviewCount: {
                $sum: 1,
              },
            },
          },
        ]);

        let reviews = {};

        if (response.length > 0) {
          reviews.ratingAvg = response[0].ratingAvg.toFixed(1);
          reviews.reviewCount = response[0].reviewCount;
        }

        return {
          ...m,
          ...reviews,
        };
      })
    );
    return res.json(result);
  } catch (error) {
    return res
      .status(error.http_code ? error.http_code : 500)
      .json(
        error.message
          ? error.message
          : "Something went wrong, please try again!"
      );
  }
};
