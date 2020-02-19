// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

// Axios
const axios = require("axios");

// MARVEL API
const md5 = require("md5");
const marvelBaseEndpoint = "https://gateway.marvel.com/";
const timestamp = 1;
const hash = md5(
  `${timestamp}${process.env.MARVEL_KEY_PRIVATE}${process.env.MARVEL_KEY_PUBLIC}`
);

// CHARACTERS
// SEARCH
app.get("/test", async (req, res) => {
  const path = "/v1/public/characters";
  const name = "Spider-Man";
  const orderBy = "name";
  const limit = "100";

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&name=${name}&orderBy=${orderBy}&limit=${limit}`
  );
  res.status(200).json(response.data);
});

app.get("/", (req, res) => {
  res.json({ message: "Reçu !!!" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server's running...");
});
