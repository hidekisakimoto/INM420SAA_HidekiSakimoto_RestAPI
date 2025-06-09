console.log("hello main");

const apiUrl = 'http://api.weatherapi.com/v1/current.json?q="Toronto"&key=f8fb60fb98054438bf0222522252905'

async function getCurrentWeather(){
    const apiRes = await fetch(apiUrl)
    const result = await apiRes.json();

    const currentTempInCelsius = result.current.temp_c;
    const cityName = result.location.name;
    const regionName = result.location.region;
    const countryName = result.location.country;
    const icon = result.current.condition.icon;
    const text = result.current.condition.text;

    const placeHolder = document.querySelector("#weather-info")
    placeHolder.innerHTML = `
    <p>Right now it is...</p>
    <p>${cityName}, ${regionName}, ${countryName}</p>
    <p>${currentTempInCelsius} C <img src="${icon}" alt=${text}"/>${text}</p>`

    console.log('currentTempInCelsius: ', currentTempInCelsius);
    console.log('countryName: ', countryName);
    console.log('api response: ', JSON.stringify(result));
}

getCurrentWeather();
