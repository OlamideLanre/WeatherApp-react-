import { useEffect, useState } from "react";

const Weather = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [bgImage, setBgImage] = useState("mainBG.jpg");
  const API_KEY = "f354b189aaf77a355d65e2f002046f0b";
  const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

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

  const handleSearch = () => {
    const cityInput = document.getElementsByClassName("cityInput");
    if (cityInput.value === "") {
      console.log("city input is empty");
      return 0;
    } else {
      fetch(REQUEST_URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            throw Error(`City '${city}' does not exist`);
          } else if (response.status === 400) {
            throw Error("Enter a city!");
          } else {
            throw Error("Something went wrong");
          }
        })
        .then((data) => {
          // console.log(data);
          setError(null);

          let Temperature = document.getElementsByClassName("temprature");
          let Feelslike = document.getElementsByClassName("feelslike");
          let wind = document.getElementsByClassName("clouds");
          let Humidity = document.getElementsByClassName("humidity");
          let City_Name = document.getElementsByClassName("currentcity");
          let description = document.getElementsByClassName("description");
          Temperature[0].innerHTML = Math.floor(data.main.temp - 273.15);
          Feelslike[0].innerHTML = Math.floor(data.main.feels_like - 273.15);
          wind[0].innerHTML = data.wind.speed + " km/h";
          Humidity[0].innerHTML = data.main.humidity + " %";
          City_Name[0].innerHTML = data.name + " " + data.sys.country;
          description[0].innerHTML = data.weather[0].description;

          if (data.weather[0].description === "clear sky") {
            setBgImage(clearSkyimg);
          } else if (data.weather[0].description === "few clouds") {
            setBgImage(fewClouds);
          } else if (data.weather[0].description === "scattered clouds") {
            setBgImage(scatteredClouds);
          } else if (data.weather[0].description === "broken clouds") {
            setBgImage(brokenCLouds);
          } else if (
            data.weather[0].description === "shower rain" ||
            data.weather[0].description === "rain" ||
            data.weather[0].description === "light rain" ||
            data.weather[0].description === "moderate rain"
          ) {
            setBgImage(rainImg);
          } else if (data.weather[0].description === "thunderstorm") {
            setBgImage(ThunderStorm);
          } else if (data.weather[0].description === "snow") {
            setBgImage(snowBg);
          } else if (data.weather[0].description === "overcast clouds") {
            setBgImage(overcast);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
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

        <p className="weather text-4xl font-semibold tracking-widest text-white ml-10 italic">
          Weather
        </p>

        <p className="weather text-1xl font-semibold tracking-widest text-white italic ml-60">
          {currentDate}
        </p>
        <span className="cityInput weather top-16 ml-10 ">
          Search for a new city
        </span>
        <input
          placeholder="Enter City Name"
          className="absolute top-24 ml-10 text-black px-10 py-2 rounded-md outline-none py"
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
        <div className="SearchIconDiv absolute w-6 left-72">
          <img
            src="https://ouch-cdn2.icons8.com/AJnCJKWQF4zk3jLDQCBaO7hkeyEHYIIHb5YXNWOLtHo/rs:fit:368:378/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTg2/L2Y0MTk0NDFlLTMz/NTYtNGZmMC04ZmIx/LWE4YzNjY2VkODU0/OC5zdmc.png"
            alt="search icon"
            onClick={handleSearch}
          />
        </div>

        <div className="absolute mt-11 text-white top-32 ml-10 ">
          <h1 className=" text-8xl tempClass ">
            <span className="temprature">NA</span>
            <span>&#176;C</span>
          </h1>
          <p className="text-2xl mt-4">
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
          {error && (
            <div style={{ color: "red" }} className="text-1xl errMsg">
              {error}
            </div>
          )}
        </div>
        <span className="absolute top-96 text-4xl text-white CurrentCity font-bold tracking-widest">
          <span className="currentcity">CITY</span>
        </span>
      </div>
    </>
  );
};
export default Weather;
