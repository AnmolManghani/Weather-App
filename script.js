
const apikey = "a26ac7107f3e139d5c350d6369a5b837";

const weatherDataEl = document.getElementById("weatherdata");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cityvalue = cityInputEl.value;
    getWeather(cityvalue);
    console.log(cityvalue);

});


async function getWeather(cityvalue) {
    try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`);
  if(!response.ok){
    throw new Error("Network response was not ok");
  }
  
  const data = await response.json();
  console.log(data);

  const icon = data.weather[0].icon;
  const temperature = Math.round( data.main.temp);
  const description = data.weather[0].main;
  const details = 
  [
    `Feels like: ${data.main.feels_like}`,
    `Humidity: ${data.main.humidity}`,
    `Wind speed: ${data.wind.speed}`
  ];

  weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />`

  weatherDataEl.querySelector(".temperature").innerHTML = `${temperature}°C`

  weatherDataEl.querySelector(".description").innerHTML = description;

  weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";


  console.log(data);


}
}
