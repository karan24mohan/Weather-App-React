import React, { useState, useEffect } from "react";

const SearchWeather = () => {
  const [search, setsearch] = useState("London");
  const [data, setdata] = useState([]);
  const [input, setinput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a349602dc304a3c066daa36e3c8f3847`
      );
      if (componentMounted) {
        setdata(await response.json());
        console.log(data);
      }
      // return () => {
      //   componentMounted = false;
      // };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else if (data.weather[0].main === "Sun") {
      emoji = "fa-sunny";
    }
  } else {
    emoji = "fa-smog";
  }

  // //Temperature converting to Celsius from Newton
  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  // //Fetching date
  // let d = new Date();
  // console.log(d);

  const handleSubmit = (event) => {
    event.preventDefault();
    setsearch(input);
  };

  return (
    <div
      className="row d-flex justify-content-center align-items-center m-0"
      style={{ height: "100vh" }}
    >
      <div className="col-md-4">
        <div className="card bg-dark text-white">
          <img
            src={`https://source.unsplash.com/600x700/?nature`}
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-75 mx-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search City"
                  aria-label="Search City"
                  aria-describedby="button-addon2"
                  name="search"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="bg-dark bg-opacity-50 py-3">
              <h2 className="card-title">{data.name}</h2>
              <p className="card-text lead">Saturday, March 19, 2022</p>
              <hr />
              <i className={`fas ${emoji} fa-4x mb-3`}></i>
              <h2 className="mb-5">{temp} &deg;C</h2>
              <p className="mb-0 lead">Cloud</p>
              <p className="lead mt-2">
                {temp_min} &deg;C | {temp_max} &deg;C
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
