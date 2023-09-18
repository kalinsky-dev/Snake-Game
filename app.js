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


window.addEventListener('keydown',(event)=>{
  console.log(event.key);
})

function clear() {
  ctx.clearRect(0, 0, width, height);
};

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
};

function rect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
};

function start() {
  clear();
  drawGrid();
};

start();
