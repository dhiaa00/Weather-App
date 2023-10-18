let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let search = document.querySelector("input");
let searchBtn = document.querySelector(".fa-magnifying-glass");
let humidity = document.querySelector(".humidity .value");
let wind = document.querySelector(".wind .value");
let mood = document.querySelector(".mood");

// get weather data

async function getData(cityName) {
  let data;
  let weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bc8ac2976e77449faf9344bfa87a1fbd`
  )
    .then((res) => res.json())
    .then((d) => (data = d));
  temp.innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
  city.innerHTML = `${data.name}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${data.wind.speed}m/s`;
}

// search city

searchBtn.onclick = () => {
  if (search.value === "") {
    alert("You need to enter a city name");
  } else {
    getData(search.value);
    search.value = "";
  }
};

// get user location

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      // Get latitude and longitude from the position object
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // print city name

      await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6dfbc9a38af84df1aced5dd9b3a90872`
      )
        .then((response) => response.json())
        .then((data) => {
          var city = data.results[0].components.town;
          getData(city);
        })
        .catch((error) => {
          console.error("Error fetching city name: " + error);
        });
    },

    function (error) {
      // Handle errors (e.g., user denied geolocation, timeout exceeded)
      console.error("Error getting geolocation: " + error.message);
    }
  );
} else {
  // Geolocation is not available
  console.log("Geolocation is not supported by your browser");
}

// change theme or mood

mood.onclick = () => {
  let img = document.querySelector("img");
  if (img.getAttribute("src") === "images/night.png") {
    img.src = "images/day.png";
    temp.style.color = "black";
    city.style.color = "black";
    mood.classList.remove("fa-sun");
    mood.classList.add("fa-moon");
    mood.style.color = "white";
    mood.style.backgroundColor = "black";
  } else {
    img.src = "images/night.png";
    temp.style.color = "white";
    city.style.color = "white";
    mood.classList.remove("fa-moon");
    mood.classList.add("fa-sun");
    mood.style.color = "black";
    mood.style.backgroundColor = "white";
  }
};

getData("hadjout");
