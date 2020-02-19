// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

// CORS
const cors = require("cors");
app.use(cors());

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

// SEARCH BY ID
app.get("/characters/:id", async (req, res) => {
  const id = req.params.id;
  const path = `/v1/public/characters/${id}/comics`;
  const orderBy = "title";
  const limit = "100";

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&orderBy=${orderBy}&limit=${limit}`
  );
  console.log(response.data.data.results);
  res.status(200).json(response.data.data.results);
});

// SEARCH BY NAME
app.get("/characters", async (req, res) => {
  const path = "/v1/public/characters";
  const orderBy = "name";
  const limit = "100";
  const name = req.query.name;
  const nameSearch = name ? `&nameStartsWith=${name}` : "";
  const page = req.query.page;

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${
      process.env.MARVEL_KEY_PUBLIC
    }&hash=${hash}${nameSearch}&orderBy=${orderBy}&limit=${limit}&offset=${limit *
      (page - 1)}`
  );

  res.status(200).json({
    total: response.data.data.total,
    datas: response.data.data.results
  });
});

// COMICS
// SEARCH BY NAME
app.get("/comics", async (req, res) => {
  const path = "/v1/public/comics";
  const orderBy = "title";
  const limit = "100";
  const title = req.query.title;

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&titleStartsWith=${title}&orderBy=${orderBy}&limit=${limit}`
  );
  console.log(response.data.data.results);
  res.status(200).json(response.data.data.results);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server's running...");
});
