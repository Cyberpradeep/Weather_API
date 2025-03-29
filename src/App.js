import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "e6c161650b0dd88dfb23c757ea88b3b9";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchWeather = useCallback(() => {
    if (!city) return;
    fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setWeatherData(null);
        }
      })
      .catch((err) => console.error("Failed to fetch weather data"));
  }, [city]);

  const weatherInfo = useMemo(()=>{
    if (!weatherData) return null;
    return (
      <div className="data">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <p><b>Temperature: </b>{weatherData.main.temp}°C</p>
        <p><b>Weather: </b>{weatherData.weather[0].description}</p>
        <p><b>Humidity: </b>{weatherData.main.humidity}%</p>
        <p><b>Wind Speed: </b>{weatherData.wind.speed} m/s</p>
      </div>
    );
  }, [weatherData]);

  return (
    <div className="App">
      <h1> 😶‍🌫️ Weather App 🌤️ </h1>
      <div className="weather">
        <input type="text" ref={inputRef} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name"/>
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {weatherInfo}
    </div>
  );
}

export default WeatherApp;
