let canvasSizeSquares = 16; // 2 - 100
const canvasSizePx = 500;
let squareSizePx = canvasSizePx / canvasSizeSquares;

let canvas = document.querySelector("#canvas");
canvas.style.width = canvasSizePx + "px";
canvas.style.height = canvasSizePx + "px";

// create the grid
function generateSquares() {
    for (let i = 0; i < canvasSizeSquares; i++) {
    //create the rows
    let row = document.createElement("div");
    row.style.height = squareSizePx + "px";
    row.classList.add("row");
    row.style.display = "flex";

    // add squares to the rows
    for (let j = 0; j < canvasSizeSquares; j++) {
        let square = document.createElement("div");
        square.style.width = squareSizePx + "px";
        square.style.height = squareSizePx + "px";
        square.classList.add("square");

        square.addEventListener("mouseenter", paint);
        square.addEventListener("mousedown", paint);

        row.appendChild(square);
    }

    canvas.appendChild(row);
    }
}


function paint(event) {
    let square = event.target;
    if (event.buttons === 1) {
        square.style.backgroundColor = "black";
    }
}

let pxSetting = document.querySelector(".px-setting");

function drawBorders() {
    canvas.style.border = "1px solid rgb(130, 120, 130)";

    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.border = "1px solid rgb(130, 120, 130)";
        square.style.width = parseFloat(square.style.width) - 2 + "px";
        square.style.height = parseFloat(square.style.height) - 2 + "px";
    });
}

pxSetting.addEventListener("focus", drawBorders);

pxSetting.addEventListener("blur", () => {
    canvas.style.border = "none";

    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.border = "none";
        square.style.width = squareSizePx + "px";
        square.style.height = squareSizePx + "px";
    });
});

pxSetting.addEventListener("keyup", () => {
    let pixels = parseInt(pxSetting.value);
    
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        row.remove();
    });

    let low = document.querySelector(".low");
    let high = document.querySelector(".high");
    if (pixels < 2) {
        canvasSizeSquares = 2;
        low.style.color = "rgb(240, 86, 86)";
        high.style.color = "rgb(191, 183, 191)";
    } else if (pixels > 100) {
        canvasSizeSquares = 100;
        high.style.color = "rgb(240, 86, 86)";
        low.style.color = "rgb(191, 183, 191)";
    } else if (pixels >= 2 && pixels <= 100) {
        canvasSizeSquares = pixels;
        low.style.color = "rgb(191, 183, 191)";
        high.style.color = "rgb(191, 183, 191)";
    } else {
        canvasSizeSquares = 2;
        low.style.color = "rgb(240, 86, 86)";
        high.style.color = "rgb(191, 183, 191)";
    }

    squareSizePx = canvasSizePx / canvasSizeSquares;

    generateSquares();
    drawBorders();
});

generateSquares();
