const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const featured = members.filter(
    (member) => member.membership === "Gold" || member.membership === "Silver"
  );

  const selected = featured.slice(0, 3);

  displaySpotlights(selected);
}

function displaySpotlights(members) {
  if (!spotlightContainer) return;

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