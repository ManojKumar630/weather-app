const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const API_KEY = process.env.API_KEY;

let favoriteCities = [];

app.get("/", (req, res) => {
  res.render("index", { weatherData: null, error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].description,
    };

    res.render("index", { weatherData, error: null });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.render("index", { weatherData: null, error: "Unable to fetch weather data. Try again!" });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const weatherData = [];

    for (const city of favoriteCities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      weatherData.push({
        city: city,
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
      });
    }

    res.render("favorites", { weatherData });
  } catch (error) {
    console.error("Error fetching favorites weather:", error.message);
    res.render("favorites", { weatherData: [] });
  }
});

app.post("/add-favorite", (req, res) => {
  const city = req.body.city;
  if (!favoriteCities.includes(city)) {
    favoriteCities.push(city);
  }
  res.redirect("/favorites");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
