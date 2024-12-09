const axios = require("axios");

const fetchWeatherData = async (city, apiKey) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await axios.get(apiUrl);
  return response.data;
};

module.exports = { fetchWeatherData };
