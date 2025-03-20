const featuredGames = [
    { title: "Game 1", description: "Exciting new game!", image: "https://via.placeholder.com/100" },
    { title: "Game 2", description: "Trending now!", image: "https://via.placeholder.com/100" },
];

const games = [
    { title: "Game A", description: "Fun and challenging!", rating: 4.5, image: "https://via.placeholder.com/60" },
    { title: "Game B", description: "An adventure awaits!", rating: 4.7, image: "https://via.placeholder.com/60" },
    { title: "Flappy Bird", description: "Classic flying game!", rating: 4.9, image: "https://via.placeholder.com/60", playable: true }
];

// Load Featured Games
const featuredContainer = document.getElementById("featured-games");
featuredGames.forEach(game => {
    let gameCard = document.createElement("div");
    gameCard.classList.add("featured-card");
    gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <p>${game.title}</p>
        <small>${game.description}</small>
    `;
    featuredContainer.appendChild(gameCard);
});

// Load Game List
const gameList = document.getElementById("game-list");
games.forEach(game => {
    let gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <span>⭐ ${game.rating}</span>
        </div>
        <button class="download-btn">${game.playable ? "Play" : "Get"}</button>
    `;

    if (game.playable) {
        gameCard.querySelector("button").addEventListener("click", () => {
            document.getElementById("flappy-bird-container").style.display = "flex";
            startFlappyBird();
        });
    }

    gameList.appendChild(gameCard);
});

// Close Flappy Bird
document.getElementById("close-game").addEventListener("click", () => {
    document.getElementById("flappy-bird-container").style.display = "none";
});

// Flappy Bird Game
function startFlappyBird() {
    const canvas = document.getElementById("flappyCanvas");
    const ctx = canvas.getContext("2d");

    let bird = { x: 50, y: 150, radius: 10, velocity: 0 };
    let gravity = 0.5;
    let jump = -7;

    document.addEventListener("keydown", () => {
        bird.velocity = jump;
    });

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Bird movement
        bird.velocity += gravity;
        bird.y += bird.velocity;

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(updateGame);
    }

    updateGame();
}
