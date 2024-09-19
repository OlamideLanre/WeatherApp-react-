import { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState();
  const [bgImage, setBgImage] = useState("mainBG.jpg");
  // const [weatherData, setWeatherData] = useState();
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // GET DATE FUNCTION
  const [currentDate, setCurrentDate] = useState(getDate());
  function getDate() {
    const todaysDate = new Date();
    const month = todaysDate.getMonth() + 1;
    const dateOfWeek = todaysDate.getDate();
    const year = todaysDate.getFullYear();

    return `${dateOfWeek}/${month}/${year}`;
  }

  // SETTING BACKGROUND IMAGES
  let clearSkyimg = "mainBG.jpg";
  let fewClouds = "fewCloudsBG.jpg";
  let rainImg = "rainBG.jpg";
  let ThunderStorm = "thunderstormBG.jpg";
  let scatteredClouds = "scatteredCloudsBG.jpg";
  let brokenCLouds = "brokenCloudsBG.jpg";
  let snowBg = "snowBG.jpg";
  let overcast = "overcastBG.avif";

  const handleSearch = async () => {
    const cityInput = document.getElementsByClassName("cityInput");
    if (cityInput.value === "") {
      console.log("city input is empty");
      return 0;
    } else {
      let response = await fetch(REQUEST_URL);
      let data = await response.json();

      if (response.ok) {
        // Storing data in a state
        // const weather = data;
        // setWeatherData(weather);
        // console.log("humidity : " + weatherData.main.humidity);

        let Temperature = document.getElementsByClassName("temprature");
        let Feelslike = document.getElementsByClassName("feelslike");
        let wind = document.getElementsByClassName("clouds");
        let Humidity = document.getElementsByClassName("humidity");
        let City_Name = document.getElementsByClassName("currentcity");
        let description = document.getElementsByClassName("description");
        Temperature[0].innerHTML = Math.floor(data.main.temp - 273.15);
        Feelslike[0].innerHTML = Math.floor(data.main.feels_like - 273.15);
        wind[0].innerHTML = data.wind.speed + "km/h";
        Humidity[0].innerHTML = data.main.humidity + "%";
        City_Name[0].innerHTML = data.name + " " + data.sys.country;
        description[0].innerHTML = data.weather[0].description;

        if (data.weather[0].icon === "01d") {
          setBgImage(clearSkyimg);
        } else if (data.weather[0].icon === "02d") {
          setBgImage(fewClouds);
        } else if (data.weather[0].icon === "03d") {
          setBgImage(scatteredClouds);
        } else if (data.weather[0].icon === "04d") {
          setBgImage(brokenCLouds);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon === "10d" ||
          data.weather[0].icon === "09n" ||
          data.weather[0].icon === "10n"
        ) {
          setBgImage(rainImg);
        } else if (data.weather[0].icon === "11d") {
          setBgImage(ThunderStorm);
        } else if (data.weather[0].icon === "13d") {
          setBgImage(snowBg);
        } else if (data.weather[0].description === "overcast clouds") {
          setBgImage(overcast);
        }

        setError(false);
      } else if (response.status === 404) {
        setError(`City '${city}' does not exist`);
      } else if (response.status === 400) {
        setError("Enter a city!");
      } else {
        setError("Something went wrong..Try again");
      }
    }
    console.log(bgImage);
  };

  return (
    <>
      <div className="Imgcontainer">
        <img
          className="image"
          src={bgImage}
          alt="background image"
          style={{ width: "100%", height: "100vh" }}
        />

        <label className="input input-bordered flex items-center gap-2 absolute top-10 ml-5">
          <input
            type="text"
            className="px-5 py-2 rounded-md outline-none grow"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            onClick={handleSearch}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <div className="container absolute p-3">
          <div className="content p-4">
            <h1 className=" text-8xl tempClass mb-3  ">
              <span className="temprature">NA</span>
              <span>&#176;C</span>
            </h1>
            <span className="text-xl currentcity">CITY</span>
            <p className="mt-4">
              feels like <span className="feelslike">NA</span>
              <span>&#176;C</span>
            </p>

            <p className=" mt-8">
              Wind Speed: <span className="clouds">NA</span>
            </p>
            <p>
              Humidity: <span className="humidity">NA</span>
            </p>
            <p className="description"></p>
            <p className="weather date text-1xl tracking-widest text-blue-400">
              {currentDate}
            </p>
          </div>

          {error && (
            <div style={{ color: "red" }} className="text-1xl errMsg">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Weather;
