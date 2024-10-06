import { useEffect, useState } from "react";
import Modal from "./component/Modal";

const Weather = () => {
  const [locationError, setLocationError] = useState(false);
  const [city, setCity] = useState("");
  const [usingMyLocation, setUsingMyLocation] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [bgImage, setBgImage] = useState("mainBG.jpg");
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const [modal, setModal] = useState({
    isError: false,
    msg: "",
    header: "",
  });
  let LATITUDE;
  let LONGITUDE;
  // SETTING BACKGROUND IMAGES
  let clearSkyimg = "mainBG.jpg";
  let fewClouds = "fewCloudsBG.jpg";
  let rainImg = "rainBG.jpg";
  let ThunderStorm = "thunderstormBG.jpg";
  let scatteredClouds = "scatteredCloudsBG.jpg";
  let brokenCLouds = "brokenCloudsBG.jpg";
  let snowBg = "snowBG.jpg";
  let overcast = "overcastBG.avif";
  // GET DATE FUNCTION
  const [currentDate, setCurrentDate] = useState(getDate());
  function getDate() {
    const todaysDate = new Date();
    const month = todaysDate.getMonth() + 1;
    const dateOfWeek = todaysDate.getDate();
    const year = todaysDate.getFullYear();

    return `${dateOfWeek}/${month}/${year}`;
  }

  const displayData = (data) => {
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
  };

  const fetchByLocation = async (URL) => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (response.ok) {
        displayData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    try {
      if (!activeSearch) {
        setUsingMyLocation(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            LATITUDE = position.coords.latitude;
            LONGITUDE = position.coords.longitude;
            fetchByLocation(
              `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}`
            );
            // console.log("fetching weather by current location");
          },
          (error) => {
            setLocationError(true);
            if (error.code === error.PERMISSION_DENIED) {
              setModal({
                isError: true,
                msg: "grant access so your location can be used",
                header: "Location access denied",
              });
              // console.log(locationError);
            } else {
              setModal({
                isError: true,
                msg: "Location is not enabled or available",
                header: "Location unavailable",
              });
            }
          }
        );
      }
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };

  const searchByCity = async () => {
    const cityInput = document.querySelector(".cityInput");

    if (cityInput.value.trim() === "") {
      setModal({
        isError: true,
        msg: `please enter a city!`,
        header: "INPUT FIELD CANNOT BE EMPTY",
      });
      return 0;
    } else {
      setActiveSearch(true);
      setUsingMyLocation(false);
      // console.log("fetching weather by searched city");
      let response = await fetch(REQUEST_URL);
      let data = await response.json();

      if (response.ok) {
        displayData(data);
      } else if (response.status === 404) {
        setModal({
          isError: true,
          msg: `City '${city}' does not exist`,
          header: "CITY DOES NOT EXIST",
        });
      } else if (response.status === 400) {
        setModal({
          isError: true,
          msg: `please enter a city!`,
          header: "INPUT FIELD CANNOT BE EMPTY",
        });
      } else {
        setModal({
          isError: true,
          msg: `Try again later`,
          header: "AN ERROR OCCURED",
        });
      }
    }
  };

  // switching to current location after search
  function useMyLocation() {
    if (locationError) {
      setUsingMyLocation(false);
      setActiveSearch(true);
      setModal({
        isError: true,
        msg: "kindly enable location",
        header: "Location denied",
      });
    } else if (usingMyLocation) {
      //if using my current location
      setLocationError(false);
      setModal({
        isError: true,
        msg: "your location is being used",
        header: "",
      });
    } else {
      //if not using my current location
      setUsingMyLocation(false);
      setModal({
        isError: true,
        msg: `Please wait...`,
        header: "fetching your location..",
      });
    }
    setActiveSearch(false);
    // console.log("active search: " + activeSearch);
  }

  useEffect(() => {
    if (!activeSearch) {
      getCurrentLocation();
    }
  }, [activeSearch]);

  const closeModal = () => {
    setModal({
      isError: false,
      msg: "",
      header: "",
    });
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
            className="px-5 py-2 rounded-md outline-none grow cityInput"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchByCity();
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            onClick={searchByCity}
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
            <p className="weather date text-1xl tracking-widest text-blue-700">
              {currentDate}
            </p>
            <p onClick={useMyLocation} className="font-semibold underline">
              My location
            </p>
          </div>

          {modal.isError ? (
            <div>
              <Modal modal={modal} onClose={closeModal} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Weather;
