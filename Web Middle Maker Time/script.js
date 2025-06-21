const apiKey = "ffcc3adabda14ee49c993004253105"

let result = document.getElementById("weather-result")

// Додаємо дату під заголовок сайту
const siteTitle = document.querySelector(".site-title")
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const todayDate = now.toLocaleDateString('en-US', options);

const dateElement = document.createElement("div");
dateElement.style.color = "#333";
dateElement.style.fontSize = "14px";
dateElement.style.marginTop = "5px";
dateElement.textContent = `Today is: ${todayDate}`;
siteTitle.insertAdjacentElement("afterend", dateElement);

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

  // Основна інформація з "Now"
  const userHour = now.getHours().toString().padStart(2, '0');
  const userMinute = now.getMinutes().toString().padStart(2, '0');
  const userTime = `${userHour}:${userMinute}`;

  result.innerHTML += `
    <div class="hour-forecast" style="background-color: #cfe3fc; font-weight: bold;">
      <strong>${userTime} (Now)</strong> — temp: ${temp}°C, ${condition}, humidity: ${humidity}%, wind: ${wind} kph
    </div>
  `;

  // Погодинний прогноз, окремий контейнер
  const hourlyWrapper = document.createElement("div");
  hourlyWrapper.style.display = "flex";
  hourlyWrapper.style.flexWrap = "wrap";
  hourlyWrapper.style.gap = "10px";

  data.forecast.forecastday[0].hour.forEach((hour, i) => {
    const time = hour.time.split(" ")[1];
    const tempHour = hour.temp_c;
    const cond = hour.condition.text;

    const hourBlock = document.createElement("div");
    hourBlock.classList.add("hour-forecast");
    hourBlock.innerHTML = `<strong>${time}</strong> — 🌡 ${tempHour}°C, ${cond}`;
    hourlyWrapper.appendChild(hourBlock);
  });

  // Вставка
  const label = document.createElement("h3");
  label.textContent = "Hourly Forecast:";
  label.classList.add("hourly-heading");
  result.appendChild(label);
  result.appendChild(hourlyWrapper);

  // Зміна фону в залежності від погоди
  const mainCondition = condition.toLowerCase();
  const container = document.querySelector(".weather-container");

  if (mainCondition.includes("sun") || mainCondition.includes("clear")) {
    container.style.backgroundColor = "#ffe680";
  } else if (mainCondition.includes("cloud") || mainCondition.includes("overcast")) {
    container.style.backgroundColor = "#888";
  } else if (mainCondition.includes("rain")) {
    container.style.backgroundColor = "#87ceeb";
  } else {
    container.style.backgroundColor = "#3d3d3d";
  }
})
})
