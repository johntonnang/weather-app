// navbar menu toggle

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar_menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

const cityArray = [
  {
    name: "Stockholm",
    long: 18.06871,
    lat: 59.32938,
    region: "Stockholms län",
  },
  {
    name: "Göteborg",
    long: 11.96679,
    lat: 57.70716,
    region: "Västra Götalands län",
  },
  { name: "Malmö", long: 13.00073, lat: 55.60587, region: "Skåne län" },
  { name: "Umeå", long: 20.27056, lat: 63.82833, region: "Västerbottens län" },
  { name: "Uppsala", long: 17.638704, lat: 59.849575, region: "Uppsala län" },
  { name: "Lund", long: 13.1971, lat: 55.7074, region: "Skåne län" },
  { name: "Linköping", long: 15.638, lat: 58.402, region: "Östergötlands län" },
  { name: "Karlstad", long: 15.638, lat: 58.402, region: " Värmlands län" },
];

const weatherText = [
  "Klart",
  "Lätt molnighet",
  "Halvklart",
  "Molnigt",
  "Mycket moln",
  "Mulet",
  "Dimma",
  "Lätt regnskur",
  "Regnskur",
  "Kraftig regnskur",
  "Åskskur",
  "Lätt by av regn och snö",
  "By av regn och snö",
  "Kraftig by av regn och snö",
  "Lätt snöby",
  "Snöby",
  "Kraftig snöby",
  "Lätt regn",
  "Regn",
  "Kraftigt regn",
  "Åska",
  "Lätt snöblandat regn",
  "Snöblandat regn",
  "Kraftigt snöblandat regn",
  "Lätt snöfall",
  "Snöfall",
  "Ymnigt snöfall",
];

let today = new Date().toLocaleDateString("sv-GB", {
  weekday: "short",
  day: "numeric",
  month: "long",
});
let timeStamp = new Date().getHours() + ":" + new Date().getMinutes();

const weather = document.querySelector("#weather");

async function get() {
  let array = [];
  for (let i = 0; i < cityArray.length; i++) {
    const response = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${cityArray[i].long}/lat/${cityArray[i].lat}/data.json`
    );
    const result = await response.json();

    let parameter = result.timeSeries[0].parameters,
      t = Math.round(parameter.find(({ name }) => name === "t").values[0]),
      ws = parameter.find(({ name }) => name === "ws").values[0],
      r = parameter.find(({ name }) => name === "r").values[0],
      wSymb = parameter.find(({ name }) => name === "Wsymb2").values[0];

    array.push({
      city: cityArray[i].name,
      temp: t,
      wind: ws,
      humidity: r,
      symb: wSymb,
    });
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
    </div>`;

    weather.innerHTML += text;
  }
  console.log(array);
}

window.onload = get();
