// DOTENV
require("dotenv").config();

// AXIOS
const axios = require("axios");

// EXPRESS
const express = require("express");
const router = express.Router();

// SAFTY
const randomstring = require("randomstring");
const md5 = require("md5");

// MONGOOSE
const mongoose = require("mongoose");
const User = require("../models/user");

// MARVEL API
const marvelBaseEndpoint = "https://gateway.marvel.com/";
const timestamp = 1;
const hash = md5(
  `${timestamp}${process.env.MARVEL_KEY_PRIVATE}${process.env.MARVEL_KEY_PUBLIC}`
);

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
    res.status(200).json({ token: newUser.account.token });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const email = req.fields.email;

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

    res.status(200).json({ message: "Favorite added" });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/user/favorites", isTokenValid, async (req, res) => {
  try {
    const tabFavoriteCharacters = req.userFound.favorites.characters;
    const tabFavoriteComics = req.userFound.favorites.comics;

    const resultCharacters = [];
    const resultComics = [];

    for (let i = 0; i < tabFavoriteCharacters.length; i++) {
      const path = `/v1/public/characters/${tabFavoriteCharacters[i]}`;

      const response = await axios.get(
        `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}`
      );
      resultCharacters.push(response.data.data.results[0]);
    }

    for (let i = 0; i < tabFavoriteComics.length; i++) {
      const path = `/v1/public/comics/${tabFavoriteComics[i]}`;
      console.log("ahah");
      const response = await axios.get(
        `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}`
      );
      resultComics.push(response.data.data.results[0]);
    }

    res
      .status(200)
      .json({ characters: resultCharacters, comics: resultComics });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
