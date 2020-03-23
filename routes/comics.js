// AXIOS
const axios = require("axios");

// EXPRESS
const express = require("express");
const router = express.Router();

// MARVEL API
const md5 = require("md5");
const marvelBaseEndpoint = "https://gateway.marvel.com/";
const timestamp = 1;
const hash = md5(
  `${timestamp}${process.env.MARVEL_KEY_PRIVATE}${process.env.MARVEL_KEY_PUBLIC}`
);

// READ BY NAME
router.get("/comics", async (req, res) => {
  const path = "/v1/public/comics";
  const orderBy = "title";
  const limit = req.query.limit ? req.query.limit : "100";
  const page = req.query.page ? req.query.page : "1";
  const title = req.query.title;
  const titleSearch = title ? `&titleStartsWith=${title}` : "";

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${
      process.env.MARVEL_KEY_PUBLIC
    }&hash=${hash}${titleSearch}&orderBy=${orderBy}&limit=${limit}&offset=${limit *
      (page - 1)}`
  );

  res.status(200).json({
    total: response.data.data.total,
    datas: response.data.data.results
  });
});

module.exports = router;
