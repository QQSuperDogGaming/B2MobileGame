const games = [
    { title: "Flappy Bird", description: "Classic flying game!", rating: 4.9, image: "https://via.placeholder.com/60", playable: "flappy" },
    { title: "Angry Birds", description: "Knock down structures!", rating: 4.8, image: "https://via.placeholder.com/60", playable: "angry" }
];

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
        <button class="download-btn">Play</button>
    `;

    gameCard.querySelector("button").addEventListener("click", () => {
        document.getElementById("store").style.display = "none";
        document.getElementById("game-screen").style.display = "flex";
        if (game.playable === "flappy") startFlappyBird();
        if (game.playable === "angry") startAngryBirds();
    });

    gameList.appendChild(gameCard);
});

// Back to Store
document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("store").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
});

// Flappy Bird Game
function startFlappyBird() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let bird = { x: 50, y: 150, radius: 10, velocity: 0 };
    let gravity = 0.5;
    let jump = -7;

    document.addEventListener("keydown", () => {
        bird.velocity = jump;
    });

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

// Angry Birds Game
function startAngryBirds() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let bird = { x: 50, y: 200, radius: 10, velocityX: 2, velocityY: -2 };

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bird.x += bird.velocityX;
        bird.y += bird.velocityY;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(updateGame);
    }

    updateGame();
}
