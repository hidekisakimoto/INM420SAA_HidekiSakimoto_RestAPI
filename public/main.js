console.log("Horoscope App Loaded");

// DOM
const zodiacSelect = document.querySelector("#zodiac-select");
const container = document.querySelector("#horoscope-info");

// Fetch horoscope
getHoroscope(zodiacSelect.value);

// Fetch new horoscope when user changes the zodiac sign
zodiacSelect.addEventListener("change", () => {
  getHoroscope(zodiacSelect.value);
});

// Pull horoscope from API Ninjas
async function getHoroscope(sign) {

  // Simulate error when click the Force Error option
  if (sign === "forceerror") {
    container.innerHTML = `<p style="color:white;">Error fetching your Zodiac Sign :(</p>`;
    alert("Error fetching the Zodiac Sign.");
    throw new Error("Error fetching the Zodiac Sign.");
  }

  const url = `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`;
  container.innerHTML = "Loading...";

  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': 'cOs//uuhtvJu/YxhhVQUmA==MzRQE1rR1KIfPRIf'
      }
    });

    const data = await response.json();
    const signFormatted = sign.charAt(0).toUpperCase() + sign.slice(1);

    container.innerHTML = `
      <div class="horoscope-card">
        <h3>${signFormatted}</h3>
        <p class="horoscope-text">Horoscope for ${data.date}</p>
        <p style="font-size:1rem;line-height:1.5rem;">${data.horoscope}</p>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:white;">Error fetching the horoscope :(</p>`;
    console.error(err);
  }
}

// HI PROFESSOR, PLEASE DON'T CONSIDER THE FOLLOWING PART, IT WAS A TEST FOR A PERSONAL PROJECT THAT I WANTED TO SAVE!

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
