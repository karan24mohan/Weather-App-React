import "./App.css";
import React, { useState } from "react";


function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };
  return (
    <div className="container">
      <div className="card bg-dark text-white">
        <img
          src="https://i.pinimg.com/564x/71/f0/ae/71f0ae5434b33a8a8e2bb4c45df1dd2a.jpg"
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <input
            type="text"
            className="input"
            placeholder="Enter City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={getWeather}
          />
          {typeof weatherData.main === "undefined" ? (
            <p>
              Welcome to the weather app! Enter in a city to get the weather
              of...
            </p>
          ) : (
            <div>
              <h5 className="card-title city">{weatherData.name}</h5>

              <p className="temp">
                {(weatherData.main.temp - 273.15).toFixed(2)} &deg;C
              </p>
              <div className="temp-info">
                <p className="temp-diff">
                  H {(weatherData.main.temp_max - 273.15).toFixed(2)} &deg;C
                </p>
                <p className="temp-diff">
                  L {(weatherData.main.temp_min - 273.15).toFixed(2)} &deg;C
                </p>
              </div>
            </div>
          )}
          {weatherData.cod === "404" ? <p>City not found</p> : <></>}
        </div>
      </div>
    </div>
  );
}
export default App;
