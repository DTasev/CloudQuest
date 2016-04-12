/**
 * Created by dimta on 12-Apr-16.
 */
var FRAMES = 60;

function initialise(){
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');

    //TODO set keyboard controls

    setInterval(gameLoop(canvas, ctx), 1000/FRAMES);
}

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render(canvas, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(20, 20, 50, 50);
    ctx.closePath();
}
function handleInput() {

}
function update() {
    
}
function gameLoop(canvas, ctx){
    // removes last frame
    clear(canvas, ctx);

    // handles user action
    handleInput();

    // update the object for the frame
    update();

    // render objects for the frame on screen
    render(canvas, ctx);
}