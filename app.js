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

const snake = {
  x: 10,
  y: 10,
};

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      snake.y--;
      if (snake.y == -1) {
        snake.y = vSize - 1;
      }
      break;
    case 'ArrowDown':
      snake.y++;
      if (snake.x == vSize) {
        snake.x = 0;
      }
      break;
    case 'ArrowLeft':
      snake.x--;
      if (snake.x == -1) {
        snake.x = hSize - 1;
      }
      break;
    case 'ArrowRight':
      snake.x++;
      if (snake.x == hSize) {
        snake.x = 0;
      }
      break;
  }
});

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function drawGrid() {
  ctx.strokeStyle = '#999999';
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
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawScene() {
  clear();
  drawGrid();
  rect(snake.x, snake.y, 'orange');
}

function start() {
  setInterval(drawScene, 100);
}

start();
