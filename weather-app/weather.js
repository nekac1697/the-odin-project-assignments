// Use everything we’ve been discussing to create a weather forecast site using the Visual Crossing API from previous lessons.
//  You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius.

// You should change the look of the page based on the data,
//  maybe by changing the color of the background or by adding images that describe the weather. 
//  (You could even use the Giphy API to find appropriate weather-related gifs and display them).
//  Feel free to use promises or async/await in your code, though you should try to become comfortable with both.

const apikey = 'Y9PZNLLYBQGEQ5SFSKYT3MXNA';
async function fetchWeather() {
    let city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city");
        return;
    }

    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apikey}&include=current&unitGroup=metric`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            alert("Please enter a valid location");
            return;
        }

        let weatherData = await response.json();
        
        // Update UI
        document.getElementById("location").textContent = `Location: ${weatherData.resolvedAddress}`;
        document.getElementById("currentTime").textContent = `Current Time: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        document.getElementById("temperature").textContent = `${weatherData.currentConditions.temp}°C`;
        document.getElementById("feelsLike").textContent = `Feels like: ${weatherData.currentConditions.feelslike}°C`;

        // Update 7-day forecast
        let forecastHTML = "";
        weatherData.days.slice(0, 7).forEach(day => {
            forecastHTML += `
                <div class="p-3 bg-gray-200 rounded-md">
                    <p class="font-semibold">${day.datetime}</p>
                    <p>High: ${day.tempmax}°C</p>
                    <p>Low: ${day.tempmin}°C</p>
                </div>
            `;
        });
        document.getElementById("forecast").innerHTML = forecastHTML;
        document.getElementById("weatherDisplay").classList.remove("hidden");

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

//staviti:
// 1) lokacija
// 2) vreme
// 3)
async function weatherData(){
    try {
        let city = prompt('Enter City');
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apikey}&include=current&unitGroup=metric`
        let data = await fetch(url);
        if(data.response === '400'){
            alert('please enter a valid location')
        }
        let weatherData = await data.json();

        

        function dataFor7Days() {
            let upcomingDays = weatherData.days.slice(0, 7); // Get first 7 days
            let result = [];
        
            for (let day of upcomingDays) {
                result.push({
                    date: day.datetime,
                    tempMax: day.tempmax,
                    tempMin: day.tempmin,
                });
            }
        
            return result; // Returns an array of objects
        }
        console.log(
            `Data i want:
            Location: ${weatherData.resolvedAddress},
            Current Time:${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})},
            Temperature: ${weatherData.currentConditions.temp},
            Feels Like: ${weatherData.currentConditions.feelslike},
           Next 7 days: ${JSON.stringify(dataFor7Days(), null, 2)}

            `
        )
        console.log(weatherData);
    } catch (error) {
        console.log(error + 'sfdsf')
    }
}

