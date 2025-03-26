const games = [
{
title: "Flappy Bird",
description: "Classic flying game!",
rating: 4.9,
image: "assets/images/games/flappy-icon.png",
playable: "flappy"
},
{
title: "Angry Birds",
description: "Knock down structures!",
rating: 4.8,
image: "assets/images/games/angry-icon.png",
playable: "angry"
},
{
title: "Candy Crush",
description: "Match-3 puzzle fun!",
rating: 4.7,
image: "assets/images/games/candy-icon.png",
playable: "candy"
}
];

const featured = document.getElementById("featured");
const gameList = document.getElementById("gameList");

games.forEach((game, index) => {
const card = document.createElement("div");
card.className = "game-card";
card.innerHTML =     `<img src="${game.image}" alt="${game.title}">     <h4>${game.title}</h4>     <p>${game.description}</p>     <p>⭐ ${game.rating}</p>     <img src="assets/images/buttons/play.png" alt="Play" class="btn-img" onclick="launchGame('${game.playable}')">`  ;
if (index < 2) featured.appendChild(card);
gameList.appendChild(card.cloneNode(true));
});

function launchGame(game) {
const canvas = document.getElementById("gameCanvas");
const closeBtn = document.getElementById("closeBtn");
canvas.style.display = "block";
closeBtn.style.display = "inline";

if (game === "flappy") startFlappy();
if (game === "angry") startAngry();
if (game === "candy") startCandyCrush();
}

function closeGame() {
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
canvas.style.display = "none";
document.getElementById("closeBtn").style.display = "none";
}
