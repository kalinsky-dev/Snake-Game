const canvas = document.getElementById('canvas');

// add JSDoc to receive intellisense
/**@type  {CanvasRenderingContext2D}*/

const ctx = canvas.getContext('2d');

window.ctx = ctx;

ctx.beginPath();
