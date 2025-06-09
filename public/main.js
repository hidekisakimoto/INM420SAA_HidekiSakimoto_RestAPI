console.log("hello main");

const cities = ["Toronto", "São Paulo", "Okinawa"];
const apiKey = "f8fb60fb98054438bf0222522252905";

async function getCurrentWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&key=${apiKey}`;
    const apiRes = await fetch(apiUrl);
    const result = await apiRes.json();

    const currentTempInCelsius = result.current.temp_c;
    const cityName = result.location.name;
    const regionName = result.location.region;
    const countryName = result.location.country;
    const localTime = result.location.localtime;
    const icon = result.current.condition.icon;
    const text = result.current.condition.text;
    const precip_mm = result.current.precip_mm;

    return `
    <div class="weather-card">
        <img src="${icon}" alt="${text}" class="weather-icon"/>
        <h3>${cityName} <span>${currentTempInCelsius}°C</span></h3>
        <p class="weather-text">${text}</p>
        <p>Region: ${regionName}</p>
        <p>Country: ${countryName}</p>
        <p>Time: ${localTime}</p>
        <p>Precipitation: ${precip_mm}</p>
    </div>`;
}

async function renderWeatherCards() {
    const container = document.querySelector("#weather-info");
    container.innerHTML = "Loading...";

    const allCards = await Promise.all(cities.map(getCurrentWeather));
    container.innerHTML = allCards.join("");
}

renderWeatherCards();

// const apiUrl = 'http://api.weatherapi.com/v1/current.json?q="Toronto"&key=f8fb60fb98054438bf0222522252905'

// async function getCurrentWeather(){
//     const apiRes = await fetch(apiUrl)
//     const result = await apiRes.json();

//     const currentTempInCelsius = result.current.temp_c;
//     const cityName = result.location.name;
//     const regionName = result.location.region;
//     const countryName = result.location.country;
//     const localTime = result.location.localtime;
//     const icon = result.current.condition.icon;
//     const text = result.current.condition.text;
//     const precip_mm = result.current.precip_mm;

//     const placeHolder = document.querySelector("#weather-info")
//     placeHolder.innerHTML = `
//     <div class="weather-card">
//     <img src="${icon}" alt="${text}" class="weather-icon"/>
//     <h3>${cityName} <span>${currentTempInCelsius}°C</span></h3>
//     <p class="weather-text">${text}</p>
//     <p>Region: ${regionName}</p>
//     <p>Country: ${countryName}</p>
//     <p>Time: ${localTime}</p>
//     <p>Precipitation: ${precip_mm}</p>
// `

//     console.log('currentTempInCelsius: ', currentTempInCelsius);
//     console.log('countryName: ', countryName);
//     console.log('api response: ', JSON.stringify(result));
// }

// getCurrentWeather();