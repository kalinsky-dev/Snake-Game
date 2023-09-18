const canvas = document.getElementById('canvas');

// add JSDoc to receive the intellisense
/**@type  {CanvasRenderingContext2D}*/

const ctx = canvas.getContext('2d');
window.ctx = ctx;

const width = canvas.width;
const height = canvas.height;
const hSize = 20;
const vSize = 20;
const gridSize = width / hSize;

let timer = null;

// Snake Data
const apple = {
  x: 5,
  y: 5,
};

const snake = {
  x: 10,
  y: 10,
};

const tail = [];

let snakeSize = 3;

const snakeDirection = {
  x: 1,
  y: 0,
};

// User Interaction
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (snakeDirection.y == 0) {
        snakeDirection.x = 0;
        snakeDirection.y = -1;
      }
      break;
    case 'ArrowDown':
      if (snakeDirection.y == 0) {
        snakeDirection.x = 0;
        snakeDirection.y = 1;
      }
      break;
    case 'ArrowLeft':
      if (snakeDirection.x == 0) {
        snakeDirection.x = -1;
        snakeDirection.y = 0;
      }
      break;
    case 'ArrowRight':
      if (snakeDirection.x == 0) {
        snakeDirection.x = 1;
        snakeDirection.y = 0;
      }
      break;
  }
});

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function drawGrid() {
  ctx.strokeStyle = '#888888';
  ctx.beginPath();

  for (let x = 1; x < hSize; x++) {
    ctx.moveTo(x * gridSize, 0);
    ctx.lineTo(x * gridSize, height);
  }
  for (let y = 1; y < vSize; y++) {
    ctx.moveTo(0, y * gridSize);
    ctx.lineTo(width, y * gridSize);
  }

  ctx.closePath();
  ctx.stroke();
}

function rect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize + 1, y * gridSize + 1, gridSize - 2, gridSize - 2);
}

// Move the apple on the random place
function spawnApple() {
  apple.x = Math.floor(Math.random() * hSize);
  apple.y = Math.floor(Math.random() * vSize);

  // Move the apple if its place is on the snake
  // Potentially infinite recursion!!!
  for (let segment of tail) {
    if (segment.x == apple.x && segment.y == apple.y) {
      spawnApple();
    }
  }
}

// Function for the physical frame
// Runs at some fixed speed, so that we have more precise calculations
function tick() {
  // Snake movement
  tail.push({
    x: snake.x,
    y: snake.y,
  });

  while (tail.length > snakeSize) {
    tail.shift();
  }

  snake.x += snakeDirection.x;
  snake.y += snakeDirection.y;

  if (snake.x == -1) {
    snake.x = hSize - 1;
  }
  if (snake.x == hSize) {
    snake.x = 0;
  }
  if (snake.y == -1) {
    snake.y = vSize - 1;
  }
  if (snake.y == vSize) {
    snake.y = 0;
  }

  // Check if the snake has bitten itself - Game Over!
  for (let segment of tail) {
    if (segment.x == snake.x && segment.y == snake.y) {
      gameOver();
    }
  }

  // Check if the snake eats the apple and
  // move the apple on another place
  if (snake.x == apple.x && snake.y == apple.y) {
    snakeSize++;
    spawnApple();
  }
}

// Function for the graphic frame
// Runs at the speed the video card can support
function drawScene() {
  clear();
  drawGrid();
  rect(snake.x, snake.y, 'orange');
  for (const segment of tail) {
    rect(segment.x, segment.y, 'green');
  }
  rect(apple.x, apple.y, 'red');
}

function main() {
  // Physics always runs before graphics so that we don't have a single frame delay
  //  between the state of the game and what the player sees
  tick();
  drawScene();
}

function gameOver() {
  clearInterval(timer);
  const choice = confirm(
    `Game over!\nYour score: ${(snakeSize - 3) * 100}\n\nPlay again?`
  );

  if (choice == true) {
    start();
  }
}

function start() {
  snake.x = 10;
  snake.y = 10;
  tail.length = 0;
  snakeSize = 3;
  snakeDirection.x = 1;
  snakeDirection.y = 0;

  spawnApple();

  timer = setInterval(main, 100);
}

start();
