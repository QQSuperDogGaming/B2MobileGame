const featuredGames = [
{ title: "Game 1", description: "Exciting new game!", image: "https://via.placeholder.com/100" },
{ title: "Game 2", description: "Trending now!", image: "https://via.placeholder.com/100" },
];

const games = [
{ title: "Game A", description: "Fun and challenging!", rating: 4.5, image: "https://via.placeholder.com/60" },
{ title: "Game B", description: "An adventure awaits!", rating: 4.7, image: "https://via.placeholder.com/60" },
{ title: "Game C", description: "A new way to play!", rating: 4.3, image: "https://via.placeholder.com/60" },
];

// Load Featured Games
const featuredContainer = document.getElementById("featured-games");
featuredGames.forEach(game => {
let gameCard = document.createElement("div");
gameCard.classList.add("featured-card");
gameCard.innerHTML =         `<img src="${game.image}" alt="${game.title}">         <p>${game.title}</p>         <small>${game.description}</small>`    ;
featuredContainer.appendChild(gameCard);
});

// Load Game List
const gameList = document.getElementById("game-list");
games.forEach(game => {
let gameCard = document.createElement("div");
gameCard.classList.add("game-card");
gameCard.innerHTML =         `<img src="${game.image}" alt="${game.title}">         <div class="game-info">             <h3>${game.title}</h3>             <p>${game.description}</p>             <span>⭐ ${game.rating}</span>         </div>         <button class="download-btn">Get</button>`    ;
gameList.appendChild(gameCard);
});

// Tab Navigation
document.getElementById("new-btn").addEventListener("click", () => {
document.getElementById("new-btn").classList.add("active");
document.getElementById("hot-btn").classList.remove("active");
});

document.getElementById("hot-btn").addEventListener("click", () => {
document.getElementById("hot-btn").classList.add("active");
document.getElementById("new-btn").classList.remove("active");
});
