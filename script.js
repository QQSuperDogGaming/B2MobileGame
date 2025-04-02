
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerCountElem = document.getElementById('playerCount');
const reviewList = document.getElementById('reviewList');
const gameStatusElem = document.getElementById('gameStatus');
const sceneBox = document.getElementById('sceneBox');
const sceneText = document.getElementById('sceneText');

let playerCount = 0;
let devPoints = 0;
let dragging = false;
let gameSold = false;
let dragStart = null;
let sceneIndex = 0;
let features = [];

let scenes = [
  "You're a teenager obsessed with mobile games. One day, you decide to make your own.",
  "You launch your first game and people actually like it. Reviews are positive. You're hooked.",
  "Now you're in your 20s. You keep updating your game. It gains popularity. You feel proud.",
  "But the pressure builds. Fewer people are playing. You start worrying about money.",
  "You're older now. You have responsibilities. Family. Bills. You sell your game to a big company.",
  "The company fills it with ads, loot boxes, and greed. Players leave. Your game dies.",
  "Years later, a new young developer starts their own simple game. The cycle continues..."
];

let ball = { x: 150, y: 250, radius: 10, vx: 0, vy: 0 };

const positiveReviews = [
  "Love the retro style!",
  "This game is my childhood again.",
  "Perfect mobile experience.",
  "So addictive!",
  "Nice work, indie dev!"
];

const negativeReviews = [
  "Too many ads now...",
  "Why did you ruin it?",
  "This used to be fun.",
  "Uninstalled after the update.",
  "Corporate garbage."
];

function showScene(index) {
  sceneBox.classList.remove('hidden');
  sceneText.textContent = scenes[index];
}

function nextScene() {
  sceneIndex++;
  if (sceneIndex < scenes.length) {
    showScene(sceneIndex);
  } else {
    sceneBox.classList.add('hidden');
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = gameSold ? 'gray' : 'red';
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
}

function update() {
  if (!gameSold) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += 0.3;

    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= -0.6;
      ball.vx *= 0.7;
    }

    ball.vx *= 0.99;
    ball.vy *= 0.99;
  }

  if (playerCount > 30 && !gameSold) {
    gameStatusElem.textContent = "Oversaturated";
  }

  if (playerCount > 50 && !gameSold) {
    sellOut();
  }

  draw();
  requestAnimationFrame(update);
}

canvas.addEventListener('pointerdown', (e) => {
  if (gameSold || sceneBox.classList.contains('hidden') === false) return;
  if (Math.hypot(e.offsetX - ball.x, e.offsetY - ball.y) < ball.radius + 10) {
    dragging = true;
    dragStart = { x: e.offsetX, y: e.offsetY };
  }
});

canvas.addEventListener('pointerup', (e) => {
  if (dragging) {
    const dx = dragStart.x - e.offsetX;
    const dy = dragStart.y - e.offsetY;
    ball.vx = dx * 0.2;
    ball.vy = dy * 0.2;
    dragging = false;
    dragStart = null;
    increasePlayerCount();
  }
});

function increasePlayerCount() {
  if (gameSold) return;
  playerCount++;
  devPoints++;
  playerCountElem.textContent = playerCount;

  if (playerCount % 3 === 0) {
    const review = document.createElement('li');
    review.textContent = positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
    reviewList.appendChild(review);
  }
}

function addFeature(name) {
  if (devPoints >= 5 && !gameSold) {
    features.push(name);
    devPoints -= 5;
    const review = document.createElement('li');
    review.textContent = `Feature added: ${name}`;
    reviewList.appendChild(review);
  }
}

function sellOut() {
  gameSold = true;
  gameStatusElem.textContent = "Sold to Publisher";

  const review = document.createElement('li');
  review.textContent = "*** GAME SOLD ***";
  reviewList.appendChild(review);

  for (let i = 0; i < negativeReviews.length; i++) {
    const neg = document.createElement('li');
    neg.textContent = negativeReviews[i];
    reviewList.appendChild(neg);
  }

  showScene(5); // show story conclusion
}

showScene(0); // start game with first scene
update();
