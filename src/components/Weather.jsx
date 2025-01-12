
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

function Weather() {
  const userCityRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [localTime, setLocalTime] = useState(null);

  const getWeather = async (e) => {
    e.preventDefault();
    const city = userCityRef.current.value;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);

      const timezoneOffset = data.timezone;

      const utcTime =
        new Date().getTime() + new Date().getTimezoneOffset() * 60000;

      const localTimeInMillis = utcTime + timezoneOffset * 1000;
      const cityLocalTime = new Date(localTimeInMillis).toLocaleString();
      setLocalTime(cityLocalTime);
    } catch (error) {
      setError(
        "There was an issue fetching the weather data. Please try again."
      );
      setWeather(null);
    }
  };

  return (
    <div
      className="p-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-weather.png')" }}
    >
      <div>
        <img
          src="/images/logo.png"
          alt="weather"
          className="w-[40px] h-[40px] mx-auto"
        />
      </div>

      <h1 className="text-4xl font-bold text-white mb-6 text-center">Weather Forecast</h1>

      <div className="flex md:hidden justify-center items-center py-2 rounded bg-black bg-opacity-20 backdrop-blur-lg">
              <form
                className="flex border-b-2 border-white"
                onSubmit={getWeather}
              >
                <input
                  ref={userCityRef}
                  type="text"
                  placeholder="Search city ..."
                  className="p-2 outline-none bg-transparent text-white placeholder-white"
                />
                <button className="text-white p-2 rounded-r">
                  <IoSearch className="text-2xl" />
                </button>
              </form>
            </div>

      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="w-full lg:w-1/2 p-4 md:h-[70vh] items-center justify-center md:justify-start flex md:items-end mt-4 md:mt-0 ">
          {weather && (
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <p className="text-5xl font-semibold text-white">
                {weather.main.temp}°C
              </p>
              <div>
                <p className="text-2xl text-white">{weather.name}</p>
                <p className="text-lg text-white">
                  {new Date(localTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(localTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "2-digit",
                  })}
                </p>
              </div>
              <span className="p-2 text-center rounded-full bg-black bg-opacity-20 backdrop-blur-lg">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16 filter brightness-0 invert"
                />
              </span>
            </div>
          )}
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3  xl:w-1/4 flex justify-center items-center mt-4 lg:mt-10">
          <div className="p-4 bg-transparent">
            <div className="hidden md:flex justify-start items-center p-4 rounded">
              <form
                className="flex border-b-2 border-white"
                onSubmit={getWeather}
              >
                <input
                  ref={userCityRef}
                  type="text"
                  placeholder="Search city ..."
                  className="p-2 outline-none bg-transparent text-white placeholder-white"
                />
                <button className="text-white p-2 rounded-r">
                  <IoSearch className="text-2xl" />
                </button>
              </form>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {weather && (
              <div className="mt-6 text-start text-white">
                <h2 className="text-lg font-medium mb-4">Weather Details ...</h2>
                <p className="text-2xl font-semibold">{weather.weather[0].description}</p>
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex justify-between space-x-2 xl:py-2 text-white">
                    <p>Temp max</p>
                    <div className="flex justify-center items-center gap-2">
                      <p>{weather.main.temp_max}°C</p>
                      <div>
                        <img src="/images/max.png" alt="max-temp" className="w-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-2 xl:py-2 text-white">
                    <p>Temp min</p>
                    <div className="flex justify-center items-center gap-2">
                      <p>{weather.main.temp_min}°C</p>
                      <div>
                        <img src="/images/min.png" alt="min-temp" className="w-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-2 xl:py-2 text-white">
                    <p>Humidity</p>
                    <div className="flex justify-center items-center gap-2">
                      <p>{weather.main.humidity}%</p>
                      <div>
                        <img src="/images/drop.png" alt="humidity" className="w-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-2 xl:py-2 text-white">
                    <p>Cloudy</p>
                    <div className="flex justify-center items-center gap-2">
                      <p>{weather.clouds.all}%</p>
                      <div>
                        <img src="/images/cloud.png" alt="cloudy" className="w-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-2 xl:py-2 text-white">
                    <p>Wind</p>
                    <div className="flex justify-center items-center gap-2">
                      <p>{weather.wind.speed} km/h</p>
                      <div>
                        <img src="/images/wind.png" alt="wind" className="w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

