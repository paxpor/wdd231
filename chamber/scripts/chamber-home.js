const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const featured = members.filter(
  (member) => member.membership === 2 || member.membership === 3
);

  const shuffled = featured.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  displaySpotlights(selected);
}

function displaySpotlights(members) {
  if (!spotlightContainer) return;

  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <p><strong>${member.membership} Member</strong></p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();

const API_KEY = "2ae6e9c1928e914a760a4e37a02b8ca3";
const CITY = "Pocatello";

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},US&units=imperial&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Current weather (first item in forecast list)
    const current = data.list[0];

    document.querySelector("#temp").textContent =
      `${Math.round(current.main.temp)}°F`;

    document.querySelector("#desc").textContent =
      current.weather[0].description;

    // 3-day forecast (every 8 entries = 24 hours)
    const forecastEl = document.querySelector("#forecast");
    forecastEl.innerHTML = "";

    const days = [8, 16, 24];

    days.forEach((index) => {
      const day = data.list[index];

      const li = document.createElement("li");
      li.textContent = `${Math.round(day.main.temp)}°F - ${day.weather[0].main}`;
      forecastEl.appendChild(li);
    });

  } catch (error) {
    console.error("Weather API error:", error);
  }
}

getWeather();