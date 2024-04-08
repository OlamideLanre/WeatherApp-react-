import { useEffect, useState } from "react";

const Weather = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [city, setCity] = useState("");
  const API_KEY = "f354b189aaf77a355d65e2f002046f0b";
  const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  function getDate() {
    const todaysDate = new Date();
    const month = todaysDate.getMonth() + 1;
    const dateOfWeek = todaysDate.getDate();
    const year = todaysDate.getFullYear();

    return `${dateOfWeek}/${month}/${year}`;
  }

  const handleSearch = () => {
    const cityInput = document.getElementsByClassName("cityInput");
    if (cityInput.value === "") {
      return 0;
    } else {
      fetch(REQUEST_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          let Temperature = document.getElementsByClassName("temprature");
          let Feelslike = document.getElementsByClassName("feelslike");
          let Clouds = document.getElementsByClassName("clouds");
          let Humidity = document.getElementsByClassName("humidity");
          let City_Name = document.getElementsByClassName("currentcity");
          Temperature[0].innerHTML = Math.floor(data.main.temp - 273.15);
          Feelslike[0].innerHTML = Math.floor(data.main.feels_like - 273.15);
          Clouds[0].innerHTML = data.weather[0].description;
          Humidity[0].innerHTML = data.main.humidity;
          City_Name[0].innerHTML = data.name + " " + data.sys.country;
        });
    }
  };

  return (
    <>
      <div className="Imgcontainer">
        <img
          src="mainBG.jpg"
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
          className="absolute top-24 ml-10 text-black px-10 py-2 rounded-md outline-none"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          // onKeyDown={handleKeydown}
          // onSubmit={handleInput}
        />
        <div className="SearchIconDiv absolute w-6 left-72">
          <img
            src="https://ouch-cdn2.icons8.com/AJnCJKWQF4zk3jLDQCBaO7hkeyEHYIIHb5YXNWOLtHo/rs:fit:368:378/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTg2/L2Y0MTk0NDFlLTMz/NTYtNGZmMC04ZmIx/LWE4YzNjY2VkODU0/OC5zdmc.png"
            alt="search icon"
            onClick={handleSearch}
          />
        </div>

        <div className="absolute mt-11 text-white top-32 ml-10">
          <h1 className=" text-8xl ">
            <span className="temprature">NA</span>
            <span>&#176;C</span>
          </h1>
          <p className="text-2xl mt-4">
            feels like <span className="feelslike">NA</span>
            <span>&#176;C</span>
          </p>

          <p className=" mt-8">
            Clouds: <span className="clouds">NA</span>
          </p>
          <p>
            Humidity: <span className="humidity">NA</span>
          </p>
        </div>

        <div className="weatherCondition top-16 absolute">
          <img
            src="https://ouch-cdn2.icons8.com/Z6bj6JFgd5lCkM6aQ1gKouPHx4zzNC6qa50DgEhmbfc/rs:fit:368:367/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjUz/LzYyZDYwNTc4LTEw/NTQtNGQ3OS1hZTg4/LWZiM2YwMjgwNGZl/Zi5wbmc.png"
            alt="weather condition png"
            width={"76%"}
          />
        </div>
        {/* <div
          className="w-16 float-right absolute top-80"
          style={{ marginLeft: "75%" }}
        >
          <img
            src="https://ouch-cdn2.icons8.com/17GI6BQh_m0SygFeleH30VYE2F8Q31HFHyZ06gcA3J0/rs:fit:368:427/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTA3/L2I1NTQyYzg0LWQ1/NjEtNDJiMi05ZWYw/LWQ3NmFhZGUzZTYy/YS5wbmc.png"
            alt="location icon"
            width={"100%"}
          />
        </div> */}
        <span
          className="absolute top-96 text-4xl text-white"
          style={{ marginLeft: "77%" }}
        >
          <span className="currentcity">CITY</span>
        </span>
      </div>
    </>
  );
};
export default Weather;
