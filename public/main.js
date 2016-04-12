/**
 * Created by dimta on 12-Apr-16.
 */
var FRAMES = 60;
var i = 30;

function initialise() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');

    //TODO set keyboard controls

    //TODO initialise player and obstacles

    return setInterval(function () {
        gameLoop(canvas, ctx)
    }, 1000 / FRAMES);
}

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawSquare(canvas, ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, canvas.height-50, canvas.width, 50);
}
function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(90, 90, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();

}
function drawPlayer(canvas, ctx) {
    var playerSprite = document.getElementById("playerSprite");
    // x 809 y 577

var f = 0;
    f++;
    // draw the car
    if (f == 2) {
        f = 4;
    }
    if (f == 6) {
        f = 0;
    }
    ctx.drawImage(playerSprite, 809, 577, 60, 56, 50, 60, 30, 40);

}
function render(canvas, ctx) {
    drawSquare(canvas, ctx);
    drawCircle(ctx);
    drawPlayer(canvas, ctx);
}
function handleInput() {

}
function update() {

}
function gameLoop(canvas, ctx) {
    // removes last frame
    clear(canvas, ctx);

    // handles user action
    handleInput();

    // update the object for the frame
    update();

    // render objects for the frame on screen
    render(canvas, ctx);
}