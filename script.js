const canvasSizePx = 500;
let canvasSizeSquares = 16; // 2 - 100px
let squareSizePx = canvasSizePx / canvasSizeSquares;

let canvas = document.querySelector("#canvas");
canvas.style.width = canvasSizePx + "px";
canvas.style.height = canvasSizePx + "px";

let clearBtn = document.querySelector("#clear-btn");
let pxSetting = document.querySelector(".px-setting");

clearBtn.addEventListener("click", clear);
pxSetting.addEventListener("focus", drawBorders);
pxSetting.addEventListener("blur", removeBorders);
pxSetting.addEventListener("keyup", updateSquares);

generateSquares();

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

    // turn squares black while holding down left click
    if (event.buttons === 1) {
        square.style.backgroundColor = "black";
    }
}

// regenerate blank squares onto the canvas
function clear() {
    console.log("click");

    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        row.remove();
    });

    generateSquares();
}

// drawBorders is called while user is updating the canvas size for visualization
function drawBorders() {
    canvas.style.border = "1px solid rgb(130, 120, 130)";

    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.border = "1px solid rgb(130, 120, 130)";
        square.style.width = parseFloat(square.style.width) - 2 + "px";
        square.style.height = parseFloat(square.style.height) - 2 + "px";
    });
}

// remove borders when the user is done updating the canvas size
function removeBorders() {
    canvas.style.border = "none";

    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.border = "none";
        square.style.width = squareSizePx + "px";
        square.style.height = squareSizePx + "px";
    });
}

function updateSquares() {
    let squares = parseInt(pxSetting.value); // number of squares on each dimension of the canvas
    
    // remove all rows and pixels from the current canvas
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        row.remove();
    });

    let low = document.querySelector(".low");
    let high = document.querySelector(".high");

    // handle input values that are too high or too low
    if (squares < 2) {
        canvasSizeSquares = 2;
        low.style.color = "rgb(240, 86, 86)";
        high.style.color = "rgb(191, 183, 191)";
    } else if (squares > 100) {
        canvasSizeSquares = 100;
        high.style.color = "rgb(240, 86, 86)";
        low.style.color = "rgb(191, 183, 191)";
    } else if (squares >= 2 && pixels <= 100) {
        canvasSizeSquares = squares;
        low.style.color = "rgb(191, 183, 191)";
        high.style.color = "rgb(191, 183, 191)";
    } else {
        canvasSizeSquares = 2;
        low.style.color = "rgb(240, 86, 86)";
        high.style.color = "rgb(191, 183, 191)";
    }

    // update the size of squares (pixels) based on user input, regenerate squares
    squareSizePx = canvasSizePx / canvasSizeSquares;

    generateSquares();
    drawBorders();
}
