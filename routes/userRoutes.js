const express = require("express");
const validator = require("../helper/validator");
const { db, getCollection } = require("../helper/db");
const response = require("../helper/response");
const encrypt = require("../helper/encrypt");
const { auth, sign } = require("../helper/jwt");

const router = express.Router();
const userM = getCollection("users");

const existing = async (model, conditon) => {
  return await model.findOne(conditon);
};

//user login and register

router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
  try {
    await validator.LoginValidator().validate({ username, password });
    const exist = await userM.findOneAndUpdate(
      {
        $or: [{ username: username }],
      },
      { $set: { updatedAt: response.dateNow() } }
    );
    if (exist) {
      const checkpassword = await encrypt.auth(exist.password, password);
      const apitoken = await sign(exist._id, "user");
      if (checkpassword) {
        res.status(200).json(
          response.set(200, "Success login account", {
            data: exist,
            token: apitoken,
          })
        );
      } else {
        throw new Error("Wrong password account");
      }
    } else {
      throw new Error("Your account not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  let { username, password, name } = req.body;
  const cryptedPassword = await encrypt.sign(password);
  try {
    await validator.RegisterValidator().validate({ username, password, name });
    const exist = await existing(userM, {
      $or: [{ username: username }, { name: name }],
    });
    if (!exist) {
      const userD = await userM.insert({
        username,
        password: cryptedPassword,
        name,
        createdAt: response.dateNow(),
        updatedAt: response.dateNow(),
      });
      const apitoken = await sign(userD._id, "user");
      res.status(200).json(
        response.set(201, "Your account created", {
          data: userD,
          token: apitoken,
        })
      );
    } else {
      throw new Error("Your account was available");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
