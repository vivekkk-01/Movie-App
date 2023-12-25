const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const Actor = require("../models/Actor");
const path = require("path");
const { unlink } = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

exports.createActor = async (req, res, next) => {
  try {
    const { name, about, gender } = req.body;
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(403).json(err.array()[0].msg);
    }
    const actor = await Actor.create({ name, about, gender });
    if (req.file) {
      const filePath = path.join(`public/upload/images/${req.file.filename}`);
      const imgOtpimize = "/h_500,w_500,g_face,c_thumb";
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        filePath
      );
      let indexOfSlash = secure_url.lastIndexOf(
        "/",
        secure_url.lastIndexOf("/") - 1
      );
      let image_url =
        secure_url.substring(0, indexOfSlash) +
        imgOtpimize +
        secure_url.substring(indexOfSlash);
      actor.avatar = { url: image_url, public_id };
      await actor.save();
      unlink(filePath, (err) => {
        if (err) {
          next(err);
        }
      });
    }
    return res.status(201).json({
      id: actor?._id,
      name: actor?.name,
      about: actor?.about,
      gender: actor?.gender,
      avatar: actor?.avatar?.url,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.updateActor = async (req, res, next) => {
  try {
    const { name, about, gender } = req.body;
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(403).json(err.array()[0].msg);
    }
    const actor = await Actor.findById(req.params.actorId);
    if (!actor) {
      return res.status(400).json("Actor not found!");
    }
    actor.name = name;
    actor.about = about;
    actor.gender = gender;
    await actor.save();
    if (req.file && actor.avatar?.public_id) {
      await cloudinary.uploader.destroy(actor?.avatar?.public_id);
    }

    if (req.file) {
      const filePath = path.join(`public/upload/images/${req.file.filename}`);
      const imgOtpimize = "/h_500,w_500,g_face,c_thumb";
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        filePath
      );
      const indexOfSlash = secure_url.lastIndexOf(
        "/",
        secure_url.lastIndexOf("/") - 1
      );
      const image_url =
        secure_url.substring(0, indexOfSlash) +
        imgOtpimize +
        secure_url.substring(indexOfSlash);
      actor.avatar = { url: image_url, public_id };
      await actor.save();
      unlink(filePath, (err) => {
        if (err) {
          next(err);
        }
      });
    }
    return res.status(201).json({
      _id: actor?._id,
      name: actor?.name,
      about: actor?.about,
      gender: actor?.gender,
      avatar: actor?.avatar,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.actorId);
    if (!actor) {
      return res.status(400).json("Actor not found!");
    }

    await Actor.findByIdAndDelete(req.params.actorId);
    if (actor.avatar?.public_id) {
      await cloudinary.uploader.destroy(
        actor?.avatar?.public_id
      );
    }
    return res.json("Profile Deleted Successfully!");
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.searchActor = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(403).json("Invalid request.");
    // const actors = await Actor.find({ $text: { $search: `"${name}"` } })
    const actors = await Actor.find({ name: { $regex: name, $options: "i" } });
    if (!actors) {
      return res.status(403).json("No Actors Found!");
    }
    return res.json(actors);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.getLatestActors = async (req, res) => {
  try {
    const actors = await Actor.find().sort({ createdAt: "-1" }).limit(12);
    return res.json(actors);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.getSingleActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.actorId);
    if (!actor) {
      return res.status(404).json("Actor Not Found!");
    }
    return res.json(actor);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

exports.getActors = async (req, res) => {
  try {
    const { pageNo, limit } = req.query;
    const actors = await Actor.find()
      .sort({ createdAt: "-1" })
      .skip(+pageNo * +limit)
      .limit(+limit);
    return res.json(actors);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};
