console.log("hello main");

const apiKey = "f8fb60fb98054438bf0222522252905";
const select = document.querySelector("#city-select");
const container = document.querySelector("#weather-info");

getCurrentWeather(select.value);

select.addEventListener("change", () => {
    getCurrentWeather(select.value);
});

async function getCurrentWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&key=${apiKey}`;
    container.innerHTML = "Loading...";

    try {
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

        container.innerHTML = `
            <div class="weather-card">
                <img src="${icon}" alt="${text}" class="weather-icon"/>
                <h3>${cityName} <span>${currentTempInCelsius}°C</span></h3>
                <p class="weather-text">${text}</p>
                <p>Region: ${regionName}</p>
                <p>Country: ${countryName}</p>
                <p>Time: ${localTime}</p>
                <p>Precipitation: ${precip_mm} mm</p>
            </div>`;
    } catch (error) {
        container.innerHTML = `<p style="color:white;">Error fetching the weather :(</p>`;
        alert(`Error fetching the weather.\n\nError: ${error.message}`);
    }
}

// console.log("hello main");

// const cities = ["Toronto", "São Paulo", "Okinawa"];
// const apiKey = "f8fb60fb98054438bf0222522252905";

// async function getCurrentWeather(city) {
//     const apiUrl = `http://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&key=${apiKey}`;
//     const apiRes = await fetch(apiUrl);
//     const result = await apiRes.json();

//     const currentTempInCelsius = result.current.temp_c;
//     const cityName = result.location.name;
//     const regionName = result.location.region;
//     const countryName = result.location.country;
//     const localTime = result.location.localtime;
//     const icon = result.current.condition.icon;
//     const text = result.current.condition.text;
//     const precip_mm = result.current.precip_mm;

//     return `
//     <div class="weather-card">
//         <img src="${icon}" alt="${text}" class="weather-icon"/>
//         <h3>${cityName} <span>${currentTempInCelsius}°C</span></h3>
//         <p class="weather-text">${text}</p>
//         <p>Region: ${regionName}</p>
//         <p>Country: ${countryName}</p>
//         <p>Time: ${localTime}</p>
//         <p>Precipitation: ${precip_mm}</p>
//     </div>`;
// }

// async function renderWeatherCards() {
//     const container = document.querySelector("#weather-info");
//     container.innerHTML = "Loading...";

//     const allCards = await Promise.all(cities.map(getCurrentWeather));
//     container.innerHTML = allCards.join("");
// }

// renderWeatherCards();
