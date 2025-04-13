const API_URL = "https://rickandmortyapi.com/api/character";
let currentPage = 1;
const perPage = 6;

let allCharacters = [];

const characterGrid = document.getElementById("character-grid");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

async function fetchCharacters(apiPage = 1) {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${apiPage}`);
    const data = await response.json();
    allCharacters = [...allCharacters, ...data.results];
    renderCharacters();
}


function renderCharacters() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const currentCharacters = allCharacters.slice(start, end);

    const container = document.getElementById("character-grid");
    container.innerHTML = ""; 

    currentCharacters.forEach(char => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <h3>${char.name}</h3>
            <p>${char.species} - ${char.status}</p>
            <a href="details.html?id=${char.id}" target="_blank">Details</a>
        `;
        container.appendChild(card);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage * perPage >= allCharacters.length) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
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
