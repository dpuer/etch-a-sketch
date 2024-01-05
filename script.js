const canvasSizeSquares = 32; // 1 - 100
const canvasSizePx = 500;
const squareSizePx = canvasSizePx / canvasSizeSquares;

let canvas = document.querySelector("#canvas");
canvas.style.width = canvasSizePx + "px";
canvas.style.height = canvasSizePx + "px";

// create the grid
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

        row.appendChild(square);
    }

    canvas.appendChild(row);
}

function paint(event) {
    let square = event.target;
    square.style.backgroundColor = "black";
}