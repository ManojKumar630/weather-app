const express = require("express");
const router = express.Router();

let favorites = []; 

router.get("/", (req, res) => {
  res.render("favorites", { favorites });
});

router.post("/add", (req, res) => {
  const city = req.body.city;
  if (city && !favorites.includes(city)) {
    favorites.push(city);
  }
  res.redirect("/favorites");
});

router.post("/remove", (req, res) => {
  const city = req.body.city;
  favorites = favorites.filter((fav) => fav !== city);
  res.redirect("/favorites");
});

module.exports = router;
