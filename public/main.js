// todo move to parameters
var player;
var gameObjects = [];

function clear(canvas, canvasContext) {

    // clear the canvas on screen
    //
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function render(canvasContext, renderArray) {
    for (var i = 0; i < gameObjects.length; i++) {
        renderArray[i].render(canvasContext);
    }
}


function handleInput() {
    //debugger;
    playerMovementManager.handleMovement(player);
}

function platformDeflation(platform) {
    platform.width -= platform.deflateSpeed;
}
/**
 * Handles the collisions between the gameObjects
 */
function update(canvasContext) {
    // collision first, apply gravity if applicable, i.e isn't colliding with ground etc
    collisionResolver.checkCollision(canvasContext, player, gameObjects);

    for (var i = 1; i < gameObjects.length; i++) {
        if (gameObjects[i].width <= 0) {
            gameObjects.splice(i, 1);
        }
        // apply animation effects, i.e. deflation of platforms, changing of sprite picture
        platformDeflation(gameObjects[i]);
    }


    /*
     update consists of
     -> handle the collision between objects
     -> apply gravity if not colliding with ground
     */
}

function gameLoop(canvas, canvasContext, renderArray) {

    // removes last frame
    clear(canvas, canvasContext);

    // handles user action
    handleInput(canvasContext);

    // update the object for the frame
    update(canvasContext);

    // render objects for the frame on screen
    render(canvasContext, renderArray);

    // reset player state when clearing the canvas
    //
    if(player.currentState == player.states.run)
        player.currentState = player.states.idle;
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
    var canvas = document.getElementById("gameCanvas");

    var canvasContext = canvas.getContext('2d');

    player = new Player(40, 30, 50, 60, 3, 5);

    KeyboardController({
        37: function () {
            player.direction = player.navigation.left;
            if(player.currentState != player.states.jump)
                player.currentState = player.states.run;
        },
        39: function () {
            player.direction = player.navigation.right;
            if(player.currentState != player.states.jump)
                player.currentState = player.states.run;
        },
        38: function () {
            player.direction = player.navigation.up;
        },
        40: function () {
            player.direction = player.navigation.down;
        },
        32: function () {

            // change the state to jumping only if on the ground
            if (player.currentState != player.states.jump) {
                player.currentState = player.states.jump;
            }else{
                player.currentState = player.states.idle;
            }
        }
    }, 1000 / FRAMES);

    // array used to store all objects for rendering
    // this is used only for rendering, not collision handling
    //
    var renderArray = [];


    //TODO initialise player and obstacles
    var basePlatform = new Platform(0, canvas.height - 50, 1000, 50, 0, 'rgb(0,0,0)');

    gameObjects.push(player);
    renderArray.push(player);

    gameObjects.push(basePlatform);
    renderArray.push(basePlatform);

    var speed = 0.0;
    for (var i = 50; i < 500; i += 150) {

        var platform = new Platform(i, i + 50, 150, 40, speed, 'rgb(0,0,0)');

        //speed-=0.08;

        gameObjects.push(platform);
        renderArray.push(platform);
    }


    return setInterval(function () {
        gameLoop(canvas, canvasContext, renderArray)
    }, 1000 / FRAMES);
})();
