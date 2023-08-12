const form = document.getElementById('wForm');
const textBox = document.getElementById('wInput');
const weatherContainer = document.getElementById("weatherContainer");
const tempBtn = document.getElementById('tempBtn');
let isMetric = tempBtn.getAttribute('data-celcius');

const units = {
  metric:{
    speed:"kph",
    temperature:"°C",
    tempKey:"c",
  },
  imperial:{
    speed:"mph",
    temperature: "°F",
    tempKey:"f",
  }
}

tempBtn.addEventListener("click",()=>{
  isMetric = !isMetric;
  tempBtn.setAttribute('data-metric', isMetric); 
  if(textBox.value){
    thenableWeatherForecast(textBox.value);
  } 
})

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let location = textBox.value;
  thenableWeatherForecast(location);
})

window.onload = ()=> thenableWeatherForecast("Mumbai");

function thenableWeatherForecast(place){
  const unit = isMetric? units.metric:units.imperial;
  WeatherForecast(place).then((responseData)=>displayWeatherData(responseData, unit));
}

async function WeatherForecast(place){
  try{
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9383185f2eae4ea0baa75154230908&q=${place}&aqi=yes`, {mode:'cors'})
  const responseData = await response.json();
  return responseData;
  }
  catch(e){
    alert("Couldn't find the weather finformation for that location!");
  }
}

function displayWeatherData(data, unit){
  const weatherImage = document.getElementById("weatherImage")
  const cityName = document.getElementById("cityName");
  const countryName = document.getElementById("countryName");
  const weatherText = document.getElementById("weatherText");
  const weatherTemp = document.getElementById("weatherTemp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const lastUpdated = document.getElementById("lastUpdated");
  cityName.textContent = data["location"].name+", "+data["location"].region;
  countryName.textContent = data["location"].country;
  weatherText.textContent = data.current.condition.text;
  weatherImage.src = data.current.condition.icon;
  weatherTemp.textContent = data.current[`temp_${unit.tempKey}`]+unit.temperature
  windSpeed.textContent = data.current[`wind_${unit.speed}`]+unit.speed;
  humidity.textContent = data.current["humidity"]+"%";
  lastUpdated.textContent = "Last updated: "+data.current.last_updated;
}
