const cloudinary = require("cloudinary");
const { unlink } = require("fs");
const { isValidObjectId } = require("mongoose");
const path = require("path");
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const { validationResult } = require("express-validator");

exports.uploadTrailer = async (req, res) => {
  try {
    const filePath = path.join(`public/upload/videos/${req.file.filename}`);
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      filePath,
      { resource_type: "video" }
    );
    unlink(filePath, (err) => {
      if (err) {
        next(err);
      }
    });
    return res.json({ secure_url, public_id });
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

exports.createMovie = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).json(error.array()[0].msg);
    }
    const { body } = req;
    const filePath = path.join(`public/upload/images/${req.file.filename}`);
    const {
      genres,
      title,
      storyLine,
      director,
      releaseDate,
      trailer,
      status,
      type,
      tags,
      cast,
      writers,
      language,
    } = body;
    if (!isValidObjectId(director))
      return res.status(403).json("Enter a valid Director, please.");
    writers.forEach((writerId) => {
      if (!isValidObjectId(writerId))
        return res.status(403).json("Enter a valid Writer, please.");
    });

    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.v2.uploader.upload(filePath, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });
    unlink(filePath, (err) => {
      if (err) {
        next(err);
      }
    });
    const breakpoints = responsive_breakpoints[0].breakpoints;
    const finalPoster = { url, public_id, responsive: [] };
    breakpoints.forEach((image) => {
      finalPoster.responsive.push(image.secure_url);
    });

    const movie = await Movie.create({
      genres,
      title,
      storyLine,
      director,
      releaseDate,
      trailer,
      status,
      type,
      tags,
      cast,
      writers,
      language,
      poster: finalPoster,
    });
    res.status(201).json(movie);
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

exports.updateMovie = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).json(error.array()[0].msg);
    }
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json("No Movie Found!");
    if (req.body.director) {
      if (!isValidObjectId(req.body.director))
        return res.status(403).json("Enter a valid Director, please.");
    }
    if (req.body.writers) {
      req.body.writers.forEach((writerId) => {
        if (!isValidObjectId(writerId))
          return res.status(403).json("Enter a valid Writer, please.");
      });
    }
    if (req.file) {
      const posterPublic_id = movie.poster?.public_id;
      if (posterPublic_id) {
        await cloudinary.v2.uploader.destroy(posterPublic_id);
      }
      const filePath = path.join(`public/upload/images/${req.file.filename}`);
      const {
        secure_url: url,
        public_id,
        responsive_breakpoints,
      } = await cloudinary.v2.uploader.upload(filePath, {
        transformation: {
          width: 1280,
          height: 720,
        },
        responsive_breakpoints: {
          create_derived: true,
          max_width: 640,
          max_images: 3,
        },
      });
      unlink(filePath, (err) => {
        if (err) {
          next(err);
        }
      });
      const breakpoints = responsive_breakpoints[0].breakpoints;
      const finalPoster = { url, public_id, responsive: [] };
      breakpoints.forEach((image) => {
        finalPoster.responsive.push(image.secure_url);
      });
      req.body.poster = finalPoster;
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { ...req.body },
      { new: true }
    );
    return res.json({
      _id: updatedMovie._id,
      title: updatedMovie.title,
      genres: updatedMovie.genres,
      poster: updatedMovie.poster,
      status: updatedMovie.status,
    });
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

exports.deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json("No Movie Found!");
    if (movie?.poster?.public_id) {
      await cloudinary.v2.uploader.destroy(movie.poster.public_id);
    }
    if (movie?.trailer?.public_id) {
      await cloudinary.v2.uploader.destroy(movie?.trailer?.public_id, {
        resource_type: "video",
      });
    }

    await Movie.findByIdAndDelete(movieId);
    return res.json("Movie Deleted Successfully!");
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

exports.getMovies = async (req, res) => {
  try {
    const { pageNo = 0, limit = 10 } = req.query;
    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .skip(+pageNo * +limit)
      .limit(+limit);
    return res.json(movies);
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

exports.getMovieData = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId)
      .populate("director")
      .populate("writers cast.actor");
    if (!movie) return res.status(404).json("Not Found");
    return res.json({
      _id: movie._id,
      title: movie.title,
      storyLine: movie.storyLine,
      tags: movie.tags,
      genres: movie.genres,
      poster: movie.poster,
      releaseDate: movie.releaseDate,
      status: movie.status,
      type: movie.type,
      language: movie.language,
      director: movie.director,
      writers: movie.writers,
      cast: movie.cast.map((c) => {
        return {
          _id: c._id,
          profile: c.actor,
          roleAs: c.roleAs,
          leadActor: c.leadActor,
        };
      }),
    });
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

exports.searchMovies = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return;
    const movies = await Movie.find({
      title: { $regex: title, $options: "i" },
    });
    return res.json(
      movies?.map((movie) => {
        return {
          _id: movie._id,
          title: movie.title,
          poster: movie.poster,
          status: movie.status,
          genres: movie.genres,
        };
      })
    );
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

exports.getLatestUploads = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const movies = await Movie.find({ status: "public" })
      .sort({ createdAt: -1 })
      .limit(+limit);
    const result = movies.map((m) => {
      return {
        id: m._id,
        title: m.title,
        storyLine: m.storyLine,
        responsivePosters: m.poster.responsive,
        poster: m.poster?.url,
        trailer: m.trailer?.url,
      };
    });
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

exports.getSingleMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate(
      "writers director cast.actor"
    );
    if (!movie) return res.status(404).json("Movie Not Found!");

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
          movie: movie._id,
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

    const {
      _id: id,
      title,
      storyLine,
      writers,
      director,
      cast,
      releaseDate,
      genres,
      tags,
      language,
      poster,
      trailer,
      type,
    } = movie;
    return res.json({
      id,
      title,
      storyLine,
      writers: writers.map((w) => {
        return {
          id: w._id,
          name: w.name,
        };
      }),
      director: { id: director._id, name: director.name },
      cast: cast.map((c) => {
        return {
          id: c._id,
          profile: {
            id: c.actor.id,
            name: c.actor.name,
            avatar: c.actor.avatar?.url,
          },
          leadActor: c.leadActor,
          roleAs: c.roleAs,
        };
      }),
      releaseDate,
      genres,
      tags,
      language,
      poster: poster?.url,
      trailer: trailer?.url,
      type,
      reviews,
    });
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

exports.getRelatedMovies = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json("Movie not found!");
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "Movie",
          foreignField: "_id",
          localField: "tags",
          as: "relatedMovie",
        },
      },
      {
        $match: {
          tags: { $in: [...movie.tags] },
          type: { $eq: movie.type },
          _id: { $ne: movie._id },
        },
      },
      {
        $project: {
          title: 1,
          poster: "$poster.url",
          responsivePosters: "$poster.responsive",
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

exports.getTopRatedMovies = async (req, res) => {
  try {
    const { type = "Film" } = req.query;
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
          type: { $eq: type },
          status: { $eq: "public" },
          $expr: { $gt: [{ $size: "$reviews" }, 0] },
        },
      },
      {
        $project: {
          title: 1,
          poster: "$poster.url",
          responsivePosters: "$poster.responsive",
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

exports.searchPublicMovies = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return;
    const movies = await Movie.find({
      title: { $regex: title, $options: "i" },
      status: "public",
    });

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
    const response = result.map((res) => {
      return {
        ...res._doc,
        poster: res._doc.poster.url,
        ratingAvg: res.ratingAvg,
        reviewCount: res.reviewCount,
      };
    });
    return res.json(response);
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
