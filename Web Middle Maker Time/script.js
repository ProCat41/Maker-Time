const apiKey = "ffcc3adabda14ee49c993004253105"

let result = document.getElementById("weather-result")

document.getElementById("location-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const city = document.getElementById("city").value
    console.log("City selected:", city)

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`

    fetch(apiUrl)
    .then(response => {
        console.log("Response object: ", response)
        return response.json()
    })
    .then(data => {
  const temp = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;
  const wind = data.current.wind_kph;
  const humidity = data.current.humidity;

  // Очистка + анімація
  result.innerHTML = "";
  result.classList.add("show");
  

  // Основна інформація
  result.innerHTML += `
    <div class="main-weather">
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind:</strong> ${wind} kph</p>
      <img src="${icon}">
    </div>
  `;

  // Погодинний прогноз
  result.innerHTML += `<h3 style="margin-top: 20px; color: white;">Hourly Forecast:</h3>`;

  data.forecast.forecastday[0].hour.forEach(hour => {
    const time = hour.time.split(" ")[1]; // 13:00
    const tempHour = hour.temp_c;
    const cond = hour.condition.text;

    result.innerHTML += `
      <div class="hour-forecast">
        <strong>${time}</strong> — 🌡 ${tempHour}°C, ${cond}
      </div>
    `;
  });

  // Зміна фону в залежності від погоди
  const mainCondition = condition.toLowerCase();
  const container = document.querySelector(".weather-container");

  if (mainCondition.includes("sun") || mainCondition.includes("clear")) {
    container.style.backgroundColor = "#ffe680"; // світлий
  } else if (mainCondition.includes("cloud") || mainCondition.includes("overcast")) {
    container.style.backgroundColor = "#888";
  } else if (mainCondition.includes("rain")) {
    container.style.backgroundColor = "#87ceeb";
  } else {
    container.style.backgroundColor = "#3d3d3d";
  }
})
})
