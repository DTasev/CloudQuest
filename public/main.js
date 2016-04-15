// TODO move to parameters
var player;
var canvas;
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
    playerMovementManager.handleMovement(player);
}

function platformDeflation(platform) {
    platformManager.handleDeflation(platform);

}
function platformGenerator(renderArray) {
    platformManager.generatePlatforms(gameObjects, renderArray);
}
/**
 * Handles the collisions between the gameObjects
 */
function update(renderArray) {
    // collision first, apply gravity if applicable, i.e isn't colliding with ground etc
    collisionResolver.checkCollision(player, gameObjects);

    if (gameObjects.length > 0) {
        for (var i = 1; i < gameObjects.length; i++) {
            if (gameObjects[i].width <= 0 || gameObjects[i].height <= 0) {
                gameObjects.splice(i, 1);
                renderArray.splice(i, 1);
            }

            // apply animation effects, i.e. deflation of platforms, changing of sprite picture
            platformDeflation(gameObjects[i]);
        }
    }

    platformGenerator(renderArray);


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
    update(renderArray);

    // render objects for the frame on screen
    render(canvasContext, renderArray);

    // reset player state when clearing the canvas
    //
    if (player.currentState == player.states.run)
        player.currentState = player.states.idle;
}

(function main() {

    var FRAMES = 60;
    canvas = document.getElementById("gameCanvas");

    var canvasContext = canvas.getContext('2d');

    player = new Player(40, 30, 50, 60, 3, 5);

    // The numbers are the keys' values
    // 37 is left arrow
    // 39 is right arrow
    // 40 is down arrow
    // 38 is up arrow
    // 32 is pressing the space bar
    //
    // The controller event fires BEFORE the gameLoop
    // function is executed
    //
    new KeyboardController({
        37: function () {
            player.direction = player.navigation.left;
            if (player.currentState != player.states.jump && player.currentState != player.states.falling) {
                player.currentState = player.states.run;
            }
        },
        39: function () {
            player.direction = player.navigation.right;
            if (player.currentState != player.states.jump && player.currentState != player.states.falling) {
                player.currentState = player.states.run;
            }
        },
        40: function () {
            player.currentState = player.states.falling;
        },
        32: function () {
            // change the state to jumping only if on the ground
            if (player.currentState == player.states.idle || player.currentState == player.states.run) {
                player.currentState = player.states.jump;
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

    var speed = 0.2;
    var deflateType = 4;
    for (var i = 50; i < 500; i += 150) {

        var platform = new Platform(i, i + 50, 150, 40, speed, deflateType++, 'rgb(0,0,0)');

        speed += 0.08;

        gameObjects.push(platform);
        renderArray.push(platform);
    }


    return setInterval(function () {
        gameLoop(canvas, canvasContext, renderArray)
    }, 1000 / FRAMES);
})();
