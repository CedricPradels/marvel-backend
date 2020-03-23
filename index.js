// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());
const user = require("./routes/user");
app.use(user);
const comics = require("./routes/comics");
app.use(comics);
const characters = require("./routes/characters");
app.use(characters);

// CORS
const cors = require("cors");
app.use(cors());

// MONGOOSE
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server's running...");
});
