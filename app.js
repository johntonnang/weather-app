// navbar menu toggle

const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar_menu")

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active")
  menuLinks.classList.toggle("active")
})

// const searchInput = document.querySelector("#search_input")

// searchInput.addEventListener("click", searchResult)

// function searchResult() {
//   let searchInputText = document.querySelector("#search_input").value.trim()
//   fetch(`${searchInputText}`)
//     .then((response) => response.json())
//     .then((data) => {})
// }

const cityArray = [
  { name: "Stockholm", long: 18.06871, lat: 59.32938 },
  { name: "Göteborg", long: 11.96679, lat: 57.70716 },
  { name: "Malmö", long: 13.00073, lat: 55.60587 },
  { name: "Umeå", long: 20.27056, lat: 63.82833 },
  { name: "Uppsala", long: 17.638704, lat: 59.849575 },
  { name: "Lund", long: 13.1971, lat: 55.7074 },
  { name: "Linköping", long: 15.638, lat: 58.402 },
  { name: "Karlstad", long: 15.638, lat: 58.402 },
]

const weather = document.querySelector("#weather")
const weatherDetailsContent = document.querySelector(".weather_details_content")
const weatherCloseBtn = document.querySelector("#weather_close_btn")
const showWeather = document.querySelector(".weather_btn")

weatherCloseBtn.addEventListener("click", () => {
  weatherDetailsContent.parentElement.classList.remove("showWeather")
})

async function get() {
  let array = []
  for (let i = 0; i < cityArray.length; i++) {
    const response = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${cityArray[i].long}/lat/${cityArray[i].lat}/data.json`
    )
    const result = await response.json()

    let parameter = result.timeSeries[0].parameters,
      t = Math.round(parameter.find(({ name }) => name === "t").values[0]),
      ws = parameter.find(({ name }) => name === "ws").values[0],
      r = parameter.find(({ name }) => name === "r").values[0],
      wSymb = parameter.find(({ name }) => name === "Wsymb2").values[0]

    array.push({
      city: cityArray[i].name,
      temp: t,
      wind: ws,
      humidity: r,
      symb: wSymb,
    })
  }

  for (let i = 0; i < array.length; i++) {
    let text = ` <div class="weather_item">
    <div class="weather_img">
      <img src="/images/${array[i].symb}.svg" alt="weather">
    </div>
    <div class="weather_name">
      <h3>${array[i].city}</h3>
      <ul>
        <li>Temperatur: ${array[i].temp} °C</li>
        <li>Vind: ${array[i].wind}m/s</li>
        <li>Luftfuktighet: ${array[i].humidity}%</li>
        </ul>
    </div>`

    weather.innerHTML += text
  }
  console.log(array)
}

window.onload = get()
