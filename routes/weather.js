const express = require("express");
const router = express.Router();
const axios = require("axios");

// Weather Route
router.get("/", async (req, res) => {
  const city = req.query.city || "Hyderabad";
  const apiKey = process.env.API_KEY; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    res.render("index", { weather: response.data, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "Unable to fetch weather data." });
  }
});

module.exports = router;