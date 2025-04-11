const API_URL = "https://rickandmortyapi.com/api/character";
let currentPage = 1;

const characterGrid = document.getElementById("character-grid");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

function fetchCharacters(page) {
    fetch(`${API_URL}?page=${page}`)
        .then(res => res.json())
        .then(data => {
            renderCharacters(data.results);
            pageInfo.textContent = `Page ${page}`;
            prevBtn.disabled = !data.info.prev;
            nextBtn.disabled = !data.info.next;
        });
}

function renderCharacters(characters) {
    characterGrid.innerHTML = "";
    characters.forEach(char => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p>${char.species}</p>
      <p>Status: ${char.status}</p>
      <a href="character.html?id=${char.id}" target="_blank">Details</a>
    `;
        characterGrid.appendChild(card);
    });
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});

function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById("clock").textContent = `${time} ${date}`;
}

document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

document.getElementById("random-btn").addEventListener("click", () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    window.open(`character.html?id=${randomId}`, "_blank");
});


setInterval(updateClock, 1000);
fetchCharacters(currentPage);
updateClock();
