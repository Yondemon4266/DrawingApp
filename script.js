const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const strokeChanger = document.getElementById("strokeWidth");
const buttonReset = document.getElementById("buttonReset");

// PROPRIETES
let drawingData = [];
let color = "#000000";
let isDrawing = false;
let strokeWidth = 1;
let x = 0;
let y = 0;
const rect = canvas.getBoundingClientRect();
buttonReset.addEventListener("click", reset);
strokeChanger.addEventListener("change", (e) => {
  strokeWidth = e.target.value;
});
colorPicker.addEventListener("change", (e) => (color = e.target.value));
// END PROPRIETES

canvas.addEventListener("mousedown", (e) => {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isDrawing = true;
  drawingData.push({ x, y });
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(ctx, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    drawingData.push({ x, y });
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    drawLine(ctx, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
    drawingData.push({ x, y });
  }
});

function initialDraw() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Redessine chaque ligne enregistrée dans drawingData
  for (let i = 0; i < drawingData.length - 1; i++) {
    const point1 = drawingData[i];
    const point2 = drawingData[i + 1];
    drawLine(ctx, point1.x, point1.y, point2.x, point2.y);
  }
}

function saveDrawingData() {
  localStorage.setItem("drawingData", JSON.stringify(drawingData));
}

function loadDrawingData() {
  const savedData = localStorage.getItem("drawingData");
  if (savedData) {
    drawingData = JSON.parse(savedData);
    initialDraw();
  }
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
  saveDrawingData();
}

function reset() {
  ctx.reset();
  localStorage.removeItem("drawingData");
}

// APPELS DIRECTS AUX FONCTIONS
loadDrawingData();
