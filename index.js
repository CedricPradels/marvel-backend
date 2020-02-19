// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

// Axios
const axios = require("axios");

app.get("/", (req, res) => {
  res.json({ message: "Reçu !!!" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server's running...");
});
