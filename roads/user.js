// EXPRESS
const express = require("express");
const router = express.Router();

// SAFTY
const randomstring = require("randomstring");
const md5 = require("md5");

// MONGOOSE
const mongoose = require("mongoose");
const User = require("../models/user");

router.post("/user/signin", async (req, res) => {
  try {
    const email = req.fields.email;
    const salt = randomstring.generate(10);
    const hash = md5(`${salt}${req.fields.password}`);
    const token = randomstring.generate(20);

    const newUser = new User({
      account: {
        email: email,
        salt: salt,
        hash: hash,
        token: token
      },
      favorites: {
        characters: [],
        comics: []
      }
    });

    await newUser.save();
    res.status(200).json(newUser.account.token);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const email = req.fields.email;
    console.log(email);

    const userFound = await User.findOne({ "account.email": email });

    if (userFound) {
      const salt = userFound.account.salt;
      const bddHash = userFound.account.hash;
      const userHash = md5(`${salt}${req.fields.password}`);

      if (userHash === bddHash) {
        res.status(200).json({ token: userFound.account.token });
      } else {
        res.status(400).json({ error: "erreur" });
      }
    } else {
      res.status(400).json({ error: "erreur" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

const isTokenValid = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  const userFound = await User.findOne({
    "account.token": token
  });

  if (userFound) {
    req.userFound = userFound;
    return next();
  } else {
    return res.status(400).json({ error: "Wrong token" });
  }
};

router.post("/user/addfavorite", isTokenValid, async (req, res) => {
  try {
    const type = req.fields.type;
    const id = req.fields.id;

    req.userFound.favorites[type].push(id);
    await req.userFound.save();
    res.status(200).json(req.UserFound);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
