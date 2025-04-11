const detailContainer = document.getElementById("character-detail");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const CHARACTER_API = `https://rickandmortyapi.com/api/character/${id}`;

function fetchCharacter() {
    fetch(CHARACTER_API)
        .then(res => res.json())
        .then(async data => {
            const episodeCount = data.episode.length;

            const episodeNames = await Promise.all(
              data.episode.map(url => fetch(url).then(res => res.json()).then(ep => ep.name))
            );
            const episodesList = episodeNames.join(', ');
            

            detailContainer.innerHTML = `
        <img src="${data.image}" alt="${data.name}" class="character-image">
        <h2>${data.name}</h2>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Species:</strong> ${data.species}</p>
        <p><strong>Type:</strong> ${data.type || "N/A"}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Origin:</strong> ${data.origin.name}</p>
        <p><strong>Location:</strong> ${data.location.name}</p>
        <p><strong>Episode Appearances:</strong> ${episodeCount} episode(s)</p>
      `;
        })
        .catch(err => {
            detailContainer.innerHTML = `<p>Error loading character details. Please try again later.</p>`;
            console.error(err);
        });
}

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


setInterval(updateClock, 1000);
updateClock();
fetchCharacter();
