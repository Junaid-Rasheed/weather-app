import React, { useState } from 'react'
import { Input } from 'antd'
import moment from 'moment'

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}

function Home () {
  const [city, setCity] = useState()
  const [weatherDetails, setWeatherDetails] = useState()
  const [showError, setShowError] = useState()
  const [showLoader, setShowLoader] = useState(false)

  const search = async (evt) => {
    if (evt.key === 'Enter') {
      setShowLoader(true)
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(data => {
          setWeatherDetails(data)
          setShowLoader(false)
        })
        .catch((e) => {
          setShowError(e)
        })
    }
  }
  if (showLoader) return <h1>Loading....</h1>
  const date = moment().format('DD/MM/YYYY')

  return (
    <div>
      <h1>Weather App</h1>
      <h3>
        {date}
        <br />
        {/* {Time} */}
      </h3>
      &nbsp;
      {weatherDetails?.message && <h1>Opps...! {weatherDetails.message}</h1>}
      {!weatherDetails && <span className='description'>Please input country name to get their weather details</span>}
      <div className='search'>
        <Input
          placeholder='Search..'
          type='text'
          className='search-bar'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={search}
        />
      </div>
      <div className='city-name'>
        <h1>
          {city},{weatherDetails?.sys?.country}
        </h1>
      </div>
      <div>
        {weatherDetails?.main && <h2>Temprature :{weatherDetails.main.temp}&deg;</h2>}
        {weatherDetails?.main?.humidity && <h2>Humadity :{weatherDetails.main.humidity}%</h2>}
        {weatherDetails?.weather && <h2>Weather :{weatherDetails.weather[0].main}</h2>}
        {weatherDetails?.visible && <h2>Visibility :{weatherDetails.visible}mi</h2>}
        {weatherDetails?.wind?.speed && <h2>WindSpeed :{weatherDetails.wind.speed}km/h</h2>}
      </div>
    </div>
  )
}

export default Home
