const memberContainer = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Failed to fetch member data");
    }

    const members = await response.json();
    displayMembers(members);

  } catch (error) {
    console.error(error);
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <p>
        <a href="${member.website}" target="_blank" rel="noopener">
          Visit Website
        </a>
      </p>
    `;

    memberContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  memberContainer.classList.add("grid-view");
  memberContainer.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  memberContainer.classList.add("list-view");
  memberContainer.classList.remove("grid-view");
});

document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

getMembers();