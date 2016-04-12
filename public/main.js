var gameObjects = [];
var playerDirection;
var LEFT = 1;
var RIGHT = 2;

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(canvas, ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(90, 90, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
}

function drawPlayer(canvas, ctx) {

    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].render(ctx);
    }

    /* var f = 0;
     f++;
     // draw the car
     if (f == 2) {
     f = 4;
     }
     if (f == 6) {
     f = 0;
     }
     ctx.drawImage(playerSprite, 809, 577, 60, 56, 50, 60, 30, 40);*/
}

function render(canvas, ctx) {
    drawSquare(canvas, ctx);
    drawCircle(ctx);
    drawPlayer(canvas, ctx);
}

function handleInput() {

}

function applyGravity() {
    // create gravity class
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].gravity();
    }
}

function update() {
    //applyGravity();
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
/**
 * Source from http://stackoverflow.com/questions/3691461/remove-key-press-delay-in-javascript
 * @author http://stackoverflow.com/users/18936/bobince
 * @param keys
 * @param repeat
 * @constructor
 */
// Keyboard input with customisable repeat (set to 0 for no key repeat)
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    document.onkeydown = function (event) {
        var key = (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key]();
            if (repeat !== 0)
                timers[key] = setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup = function (event) {
        var key = (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key] !== null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur = function () {
        for (key in timers)
            if (timers[key] !== null)
                clearInterval(timers[key]);
        timers = {};
    };
}

(function main() {
    var FRAMES = 60;

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');

    //TODO set keyboard controls
    KeyboardController({
        37: function () {
            playerDirection = LEFT;
            console.log('left arrow key' + playerDirection);
        },
        39: function () {
            playerDirection = RIGHT;
            console.log('right arrow key' + playerDirection);
        },
        32: function () {
            PLAYER_JUMPING = true;
        }
    }, 1000 / FRAMES);

    //TODO initialise player and obstacles

    var player = new Player(40, 50, 50, 60, 5);
    gameObjects.push(player);


    return setInterval(function () {
        gameLoop(canvas, ctx)
    }, 1000 / FRAMES);
})();
