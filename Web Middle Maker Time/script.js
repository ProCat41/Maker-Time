const apiKey = "ffcc3adabda14ee49c993004253105"

let result = document.getElementById("weather-result")

document.getElementById("location-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const city = document.getElementById("city").value
    console.log("City selected:", city)

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    fetch(apiUrl)
    .then(response => {
        console.log("Response object: ", response)
        return response.json()
    })
    .then(data => {
        console.log("Weather data: ", data)
        const temp = data.current.temp_c
        const condition = data.current.condition.text
        const icon = data.current.condition.icon
        result.innerHTML = `<div>
        <p>Temperature: ${temp}</p>
        <p>Condition: ${condition}</p>
        <img src="${icon}">
        </div>`
    })
    .catch(error => {
        console.error("Error fetching data: ")
    })
})