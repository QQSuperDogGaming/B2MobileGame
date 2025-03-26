const js = `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const levelText = document.getElementById('levelText');
const bossHealthText = document.getElementById('bossHealth');
const message = document.getElementById('message');

let level = 1;
let birdX = 100;
let birdY = canvas.height - 100;
let targetX = canvas.width - 100;
let targetY = canvas.height - 150;
let launched = false;
let birdVX = 0;
let birdVY = 0;
let gravity = 0.5;
let targets = 5;
let bossPhase = false;
let kingPigHP = 3;
let dodgeCooldown = 0;

function resetBird() {
birdX = 100;
birdY = canvas.height - 100;
birdVX = 0;
birdVY = 0;
launched = false;
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw bird
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(birdX, birdY, 20, 0, Math.PI * 2);
ctx.fill();

// Draw targets or boss
if (!bossPhase) {
ctx.fillStyle = 'brown';
for (let i = 0; i < targets; i++) {
ctx.fillRect(targetX - i * 40, targetY - i * 30, 30, 30);
}
} else {
ctx.fillStyle = 'green';
ctx.beginPath();
ctx.arc(targetX, targetY, 50, 0, Math.PI * 2);
ctx.fill();
}
}

function update() {
if (launched) {
birdX += birdVX;
birdY += birdVY;
birdVY += gravity;
}

// Check hit
if (!bossPhase && launched && birdX > targetX - targets * 40 && birdY > targetY - targets * 30) {
targets--;
if (targets <= 0) {
message.textContent = 'Boss Appears!';
bossPhase = true;
birdX = 100;
birdY = canvas.height - 100;
bossHealthText.style.display = 'block';
}
resetBird();
}

// Boss hit
if (bossPhase && launched && Math.hypot(birdX - targetX, birdY - targetY) < 60) {
kingPigHP--;
bossHealthText.textContent = 'King Pig HP: ' + kingPigHP;
message.textContent = kingPigHP <= 0 ? 'You Win!' : 'Hit!';
resetBird();
}

// Boss attack
if (bossPhase && dodgeCooldown <= 0) {
message.textContent = 'Swipe to Dodge!';
dodgeCooldown = 100;
} else if (dodgeCooldown > 0) {
dodgeCooldown--;
}
}

canvas.addEventListener('click', () => {
if (!launched && !bossPhase) {
birdVX = (targetX - birdX) / 20;
birdVY = (targetY - birdY) / 20;
launched = true;
} else if (bossPhase && kingPigHP > 0) {
birdVX = (targetX - birdX) / 10;
birdVY = (targetY - birdY) / 10;
launched = true;
}
});

canvas.addEventListener('touchstart', (e) => {
if (bossPhase && kingPigHP > 0) {
const touch = e.touches[0];
const x = touch.clientX;
const y = touch.clientY;
if (dodgeCooldown > 90) {
message.textContent = 'Dodged!';
dodgeCooldown = 0;
}
}
});

function gameLoop() {
draw();
update();
requestAnimationFrame(gameLoop);
}
gameLoop();`;

// Save these as index.html, style.css, and script.js respectively.
// You'll have 5 block levels, then the King Pig boss fight with swipe to dodge!
