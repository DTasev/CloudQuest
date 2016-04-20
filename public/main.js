// TODO remove from global?
var player;
var canvas;
var currentGameState;
var gameObjects;

var gameOver = false;

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
function renderMenuState(canvasContext, mainMenu) {
    mainMenu.render();
}
function renderGameOver(canvasContext) {

    canvasContext.fillStyle = 'rgb(0,0,0)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.font = '30px Georgia';
    canvasContext.fillStyle = "White";

    var currentScore = scoreManager.getCurrentScoreAndTimeSurvived();
    var savedScore = scoreManager.getSavedScoreAndTimeSurvived();

    canvasContext.fillText('Game Over!', canvas.width / 2, canvas.height / 2);


    // Do some checks to see if the scores are new high scores
    //
    if (currentScore.score > savedScore.score) {

        canvasContext.fillText('New HIGH SCORE: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
        canvasContext.fillText('New HIGH SCORE for Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);


    } else {

        canvasContext.fillText('Current Score: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
        canvasContext.fillText('Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);


    }


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
function render(canvasContext, gameObjects, mainMenu) {
    switch (currentGameState) {

        // Render game menu state
        //
        case gameStates.menu:

            renderMenuState(canvasContext, mainMenu);

            break;

        // Render game playing state
        //
        case gameStates.playing:

            renderPlayingState(gameObjects, canvasContext);

            break;

        // Render game over state
        //
        case gameStates.gameOver:

            renderGameOver(canvasContext);

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

function removeOutOfBoundsObjects(gameObjects) {
    for (var i = 1; i < gameObjects.length; i++) {

        var platform = gameObjects[i];

        // Check if the current platform's width or height are equal or below 0
        // if they are then they must be deleted
        //
        if (platform.width <= 0
            || platform.height <= 0
            || platform.y > canvas.height) {

            if (gameObjects[i].constructor == Coin) {

                // remove the coin from the game objects array
                //
                coinManager.removeCoin(i, gameObjects);

            }

            // if the player is colliding with a platform object
            if (gameObjects[i].constructor == Platform) {

                platformManager.removePlatform(i, gameObjects);

                // else not colliding with anything, apply gravity
            }
        }
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

    removeOutOfBoundsObjects(gameObjects);

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

    coinManager.generateCoins(gameObjects);

    if (collisionDetector.checkLowerBounds(player)) {

        currentGameState = gameStates.gameOver;
        gameOver = true;
    }
}

function updateMenuState(canvas, mainMenu) {
    mainMenu.update();
}
/**
 * Handles the collisions between the gameObjects
 */
function update(canvas, gameObjects, mainMenu) {

    switch (currentGameState) {

        // Update menu state
        //
        case gameStates.menu:

            updateMenuState(canvas, mainMenu);

            break;

        // Update playing state
        //
        case gameStates.playing:

            updatePlayingState(canvas, gameObjects);

            break;

        // Update game over state
        //
        case gameStates.gameOver:

            if (gameOver) {
                scoreManager.stopTimer();

                scoreManager.saveScoreLocally();
                setTimeout(function () {
                    currentGameState = gameStates.menu;
                }, 2000);
                // after a few seconds go back to main menu or click for new game ( from keyboard controller)

                gameOver = false;
            }
            break;
    }
}


function gameLoop(canvas, canvasContext, gameObjects, mainMenu) {

    // removes last frame
    clear(canvas, canvasContext);

    // handles user action
    handleInput(canvasContext);

    // update the object for the frame
    update(canvas, gameObjects, mainMenu);

    // render objects for the frame on screen
    render(canvasContext, gameObjects, mainMenu);

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
 * @param playerObject
 * @param gameObjects
 */
function initialiseKeyboardControls(FRAMES, playerObject, gameObjects) {

    new KeyboardController({

        // Left Arrow
        //
        37: function () {
            playerMovementManager.leftArrowControls(playerObject);
        },

        // Right Arrow
        //
        39: function () {
            playerMovementManager.rightArrowControls(playerObject);
        },

        // Down arrow
        //
        40: function () {
            playerMovementManager.downArrowControls(playerObject);
        },

        // Space bar
        //
        32: function () {
            playerMovementManager.jumpingControls(playerObject);
        }

    }, 1000 / FRAMES);
}

/**
 *  Deletes the objects array and
 *  initialises the starting objects
 *
 */
function initialiseGameObjects() {

    // Sets the frames per second of the game.
    // Default value is 60, and the game is
    // intended to be played at 60 FPS
    //
    var FRAMES = 60;


    // Reset game objects array
    //
    gameObjects = [];

    player = new Player(140, 25, 35, 60, 1.5, 1);
    gameObjects.push(player);

    var basePlatform = new Platform(0, canvas.height - 50, canvas.width, 50, 0, 1, 'rgb(0,0,0)');
    gameObjects.push(basePlatform);

    var coin = new Coin(50, 50, 1);
    var coin1 = new Coin(70, 50, 1);
    var coin2 = new Coin(80, 50, 1);
    var coin3 = new Coin(90, 50, 1);
    gameObjects.push(coin);
    gameObjects.push(coin1);
    gameObjects.push(coin2);
    gameObjects.push(coin3);

    scoreManager.startTimer();
    platformManager.resetPlatformGeneration();
    coinManager.resetCoinGeneration();

    var speed = 0.2;
    var deflateType = 4;
    for (var i = 50; i < 500; i += 150) {

        var platform = new Platform(i, i + 50, 150, 40, speed, deflateType++, 'rgb(0,0,0)');

        speed += 0.08;

        gameObjects.push(platform);
    }


    // Initialise all of the keyboard controls for all the states
    //
    initialiseKeyboardControls(FRAMES, player, gameObjects);
}

/**
 * Initialises the game variables and game state
 */
(function main() {

    // Get the canvas element
    //
    canvas = document.getElementById("gameCanvas");

    // Get the canvas' context for drawing
    //
    var canvasContext = canvas.getContext('2d');

    var mainMenu = new MainMenu('Title', canvasContext);

    // Set the initial state of the game
    //
    currentGameState = gameStates.menu;


    return setInterval(function () {
        gameLoop(canvas, canvasContext, gameObjects, mainMenu)
    }, 1000 / 60);
})();
