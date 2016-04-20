// TODO remove from global?
var player;
var canvas;
var currentGameState;
var gameObjects;
var gameStates = {
    'menu': 0,
    'playing': 1,
    'gameOver': 2
};


/**
 * This function clears the canvas on screen before
 * the next frame's objects are updated and then drawn.
 *
 * @param canvas The HTML5 canvas object ID
 * @param canvasContext The canvas' context object
 */
function clear(canvas, canvasContext) {

    // clear the canvas on screen
    //
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * The function loops through the objects backwards.
 * It starts from the last until the first one.
 * This is done on purpose, because the player is always
 * the first object in the array, so in order to be rendered
 * on top he has to be the last object rendered on the screen.
 *
 *
 * @param gameObjects The game's object that have to be rendered on screen.
 * @param canvasContext The canvas' context on which the object will be drawn
 */
function renderPlayingState(gameObjects, canvasContext) {
    for (var i = gameObjects.length - 1; i >= 0; i--) {
        gameObjects[i].render(canvasContext);
    }
}
function renderMenuState(canvasContext) {
    canvasContext.fillText('Click left mouse button to play', canvas.width / 2, canvas.height / 2);
}
/**
 * This function loops through all objects in the render array
 * and invokes the render function they have.
 *
 * The function changes depending on which state the game is,
 * thus rendering separate screen for each one.
 *
 * @param canvasContext The canvas' context object.
 * @param gameObjects
 */
function render(canvasContext, gameObjects) {
    switch (currentGameState) {

        // Render game menu state
        case gameStates.menu:

            renderMenuState(canvasContext);

            break;

        // Render game playing state
        case gameStates.playing:

            renderPlayingState(gameObjects, canvasContext);

            break;

        // Render game over state
        //
        case gameStates.gameOver:

            renderMenuState(canvasContext);

            break;
    }
}


function handleInput() {

    switch (currentGameState) {

        // Handle input for the menu state
        //
        case gameStates.menu:

            break;

        // Handle input for the playing state
        //
        case gameStates.playing:

            playerMovementManager.handleMovement(player);

            break;

        // Handle input for the game over state
        //
        case gameStates.gameOver:

            break;
    }
}

/**
 * This method first handles the collision between objects using the
 * collisionResolver class.
 *
 * After it all the collision has been processed and handled,
 * the method then proceeds to deflate
 */

function updatePlayingState(canvas, gameObjects) {

    // Handle the collision and gravity of between the objects and player
    //
    collisionResolver.checkCollision(player, gameObjects);

    // Handles the deflation and removal of platforms from
    // the gameObjects and renderArray arrays
    //
    platformManager.handleDeflation(canvas, gameObjects);

    // Generates platforms and adds them to the gameObjects
    // and renderArray arrays
    //
    platformManager.generatePlatforms(gameObjects);

    gameScroller.scrollGame(gameObjects);

    scoreManager.updateScore();

    // Todo game over condition/state
    if (collisionDetector.checkLowerBounds(player)) {

        //TODO activate turned off for debugging
        //currentGameState = gameStates.gameOver;
    }
}
/**
 * Handles the collisions between the gameObjects
 */
function update(canvas, gameObjects) {

    switch (currentGameState) {

        // Update menu state
        //
        case gameStates.menu:

            break;

        // Update playing state
        //
        case gameStates.playing:

            updatePlayingState(canvas, gameObjects);

            break;

        // Update game over state
        //
        case gameStates.gameOver:
            // after a few seconds go back to main menu or click for new game ( from keyboard controller)

            break;
    }
}


function gameLoop(canvas, canvasContext, gameObjects) {

    // removes last frame
    clear(canvas, canvasContext);

    // handles user action
    handleInput(canvasContext);

    // update the object for the frame
    update(canvas, gameObjects);

    // render objects for the frame on screen
    render(canvasContext, gameObjects);

    // Reset player to idle if he's running and has stopped.
    // If this is not cleared here, the player will never stop running
    //
    if (player.currentState == player.states.run) {
        player.currentState = player.states.idle;
        player.direction = 0;
    }
}

/**
 *
 * The numbers are the keys' values
 * 37 is left arrow
 * 39 is right arrow
 * 40 is down arrow
 * 38 is up arrow
 * 32 is pressing the space bar
 *
 * The controller event fires BEFORE the gameLoop
 * function is executed and thus changes the player's
 * state before any of the updates or rendering have happened.
 *
 * Depending on the FRAMES parameter, the input will be checked at
 * different speed. The default is 60, which matches the
 * render speed of the game.
 *
 * @param FRAMES how many times per second will the keyboard input be checked
 */
function initialiseKeyboardControls(FRAMES, gameObjects) {

    new KeyboardController({

        // Left Arrow
        //
        37: function () {

            switch (currentGameState) {

                // Handle keys on menu state
                //
                case gameStates.menu:

                    break;

                // Handle keys on playing state
                //
                case gameStates.playing:

                    player.direction = player.navigation.left;

                    if (player.currentState != player.states.jump && player.currentState != player.states.falling) {
                        player.currentState = player.states.run;
                    }

                    break;

                // Handle keys on game over state
                //
                case gameStates.gameOver:

                    break;


            }
            // Change the player's direction to reflect heading left
            //


        },

        // Right Arrow
        //
        39: function () {

            switch (currentGameState) {

                case gameStates.menu:

                    break;


                case gameStates.playing:

                    // Change the player's direction to reflect heading right
                    //
                    player.direction = player.navigation.right;

                    // Change the player state to run if he is NOT falling or jumping
                    //
                    if (player.currentState != player.states.jump && player.currentState != player.states.falling) {
                        player.currentState = player.states.run;
                    }

                    break;


                case gameStates.gameOver:

                    break;


            }

        },

        // Down arrow
        //
        40: function () {


            switch (currentGameState) {

                case gameStates.menu:

                    break;


                // Pressing down while playing will do:
                // If the player is still jumping up, it will stop the jump
                // it will also reset the player's direction, so the player
                // will start going straight down
                //
                case gameStates.playing:


                    player.currentState = player.states.falling;
                    player.direction = 0;

                    break;


                case gameStates.gameOver:

                    break;


            }
        },

        // Space bar
        //
        32: function () {
            switch (currentGameState) {

                case gameStates.menu:

                    currentGameState = gameStates.playing;

                    break;


                case gameStates.playing:

                    // Change the state to jumping only
                    // if the player is already on the ground
                    // running or sitting idly
                    //
                    if (player.currentState == player.states.idle || player.currentState == player.states.run) {
                        player.currentState = player.states.jump;
                    }

                    break;


                case gameStates.gameOver:

                    currentGameState = gameStates.menu;

                    initialiseGameObjects(gameObjects);

                    break;


            }

        }
    }, 1000 / FRAMES);
}

/**
 *  Deletes the objects array and
 *  initialises the starting objects
 *
 */
function initialiseGameObjects() {
    gameObjects = []; // does this leave garbage?

    player = new Player(140, 30, 35, 60, 1.5, 1);
    gameObjects.push(player);

    var basePlatform = new Platform(0, canvas.height - 50, canvas.width, 50, 0, 'rgb(0,0,0)');
    gameObjects.push(basePlatform);

    var coin = new Coin(50, 50, 1);
    gameObjects.push(coin);

    var speed = 0.2;
    var deflateType = 4;
    for (var i = 50; i < 500; i += 150) {

        var platform = new Platform(i, i + 50, 150, 40, speed, deflateType++, 'rgb(0,0,0)');

        speed += 0.08;

        gameObjects.push(platform);
    }
}

/**
 * Initialises the game variables and game state
 */
(function main() {

    // Sets the frames per second of the game.
    // Default value is 60, and the game is
    // intended to be played at 60 FPS
    //
    var FRAMES = 60;

    // Get the canvas element
    //
    canvas = document.getElementById("gameCanvas");

    // Get the canvas' context for drawing
    //
    var canvasContext = canvas.getContext('2d');

    // Set the initial state of the game
    //
    currentGameState = gameStates.playing;


    // Initialise all of the keyboard controls for all the states
    //
    initialiseKeyboardControls(FRAMES, gameObjects);

    // Initialise the game objects
    //
    initialiseGameObjects(gameObjects);

    return setInterval(function () {
        gameLoop(canvas, canvasContext, gameObjects)
    }, 1000 / FRAMES);
})();
