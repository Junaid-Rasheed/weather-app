import React, { useEffect, useState } from "react";
import { Input } from "antd";
import moment from "moment";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function Home() {
  const [city, setCity] = useState();
  const [temp,setTemp] = useState();
  const [weather,setWeather] = useState();

  const [country,setCountry] = useState();

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const data = await fetch(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
      );
      const response  = await data.json();
      setWeather(response.weather[0].main)
      setTemp(response.main.temp)
  setCountry(response.sys.country)
      console.log(response);
     console.log(response.name)
    console.log(response.sys.country)
     console.log(response.main.temp)
     console.log(response.weather[0].main) 

     
    }
  };

  var date = moment().format("DD/MM/YYYY");

  return (
    <div>
      <h1>Weather App</h1>
      <h3>
        {date}
        <br />
        {/* {Time} */}
      </h3>
      &nbsp;
      <div className="search">
        <Input
          placeholder="Search.."
          type="text"
          className="search-bar"
          placeholder="Search"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={search}
        />
      </div>
      <div className="city-name">
        <h2>{city},{country}</h2>
      </div>
      <div>
        <h1>{temp}&deg;</h1>
      </div>
      <div>
        <h2>{weather}</h2>
      </div>
    </div>
  );
}

export default Home;
