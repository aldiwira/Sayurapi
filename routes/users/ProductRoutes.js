const express = require("express");
const moment = require("moment");
const { db, getCollection, collectionName } = require("../../helper/db");
const validator = require("../../helper/validator");
const response = require("../../helper/response");
const { auth } = require("../../helper/jwt");
const { route } = require("../userRoutes");

const router = express.Router();
const productM = getCollection(collectionName.products);
const dateNow = moment().format();

const productCheck = async (condition) => {
  return await productM.findOne(condition);
};

router.get("/", auth, async (req, res, next) => {
  try {
    await productM.find().then((datas) => {
      res
        .status(200)
        .json(response.set(200, "success fetch all product", datas));
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    await productM.find({ _id: id }).then((datas) => {
      res
        .status(200)
        .json(response.set(200, "success fetch all product", datas));
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    if (!req.files) {
      res.status(400).json(response.set(400, "no file upload", null));
    } else {
      let image = req.files.images;
      image.mv(`./uploads/${image.name}`);

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: image.name,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
