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
    }, 1000 / 60);
}

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawSquare(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(20, 20, 50, 50);
    ctx.closePath();
}
function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(90, 90, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();

}
function render(canvas, ctx) {
    drawSquare(ctx);
    drawCircle(ctx);
}
function handleInput() {

}
function update() {

}
function gameLoop(canvas, ctx) {
    console.log("Lol");
    // removes last frame
    clear(canvas, ctx);

    // handles user action
    handleInput();

    // update the object for the frame
    update();

    // render objects for the frame on screen
    render(canvas, ctx);
}