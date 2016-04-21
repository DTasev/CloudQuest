// Global canvas variable, to avoid repeating
//
//
var canvas;

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
 * This function loops through all objects in the render array
 * and invokes the render function they have.
 *
 * The function changes depending on which state the game is,
 * thus rendering separate screen for each one.
 *
 * @param canvasContext The canvas' context object.
 * @param mainMenu The mainMenu object reference
 * @param game The game object reference
 */
function render(canvasContext, mainMenu, game) {
    switch (game.currentGameState) {

        // Render game menu state
        //
        case game.gameStates.menu:

            game.renderMenuState(canvasContext, mainMenu);

            break;

        // Render game playing state
        //
        case game.gameStates.playing:

            game.renderPlayingState(game.gameObjects, canvasContext);

            break;

        // Render game over state
        //
        case game.gameStates.gameOver:

            game.renderGameOver(canvasContext);

            break;
    }
}


/**
 * Handles the player's input and updates the player accordingly
 *
 * @param game
 */
function handleInput(game) {

    switch (game.currentGameState) {

        case game.gameStates.playing:

            playerMovementManager.handleMovement(game.player);

            break;

    }
}


/**
 * Updates the game's canvas depending on the state of the game
 */
function update(canvas, mainMenu, game) {

    switch (game.currentGameState) {

        // Update menu state
        //
        case game.gameStates.menu:

            game.updateMenuState(canvas, mainMenu);

            break;

        // Update playing state
        //
        case game.gameStates.playing:

            game.updatePlayingState(canvas, game.player, game.gameObjects);

            break;

        // Update game over state
        //
        case game.gameStates.gameOver:

            game.updateGameOverState();

            break;
    }
}


/**
 * Request animation frame variable, it renders at 60 FPS
 */
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


/**
 * Starts the main loop of the game. Uses requestAnimationFrame
 * to draw the new frames at 60 FPS.
 *
 * This is an object wrapper for the gameLoop,
 * to provide local access to the variables, so
 * that we can use requestAnimationFrame and still keep
 * the references.
 *
 */
var StartGameLoop = (function (){

    var canvContext;
    var gameRef;
    var mainMenuRef;

    /**
     * Constructor for the game loop. It keeps local references
     * of the variables so that they are always accessible to the
     * game loop.
     *
     * @param canvasContext The Canvas' context
     * @param mainMenu The main menu class that will be updated/rendered
     * @param game The game class object
     */
    function StartGameLoop(canvasContext, game, mainMenu){
        canvContext = canvasContext;
        gameRef = game;
        mainMenuRef = mainMenu;
    }


    /**
     * Game Loop using the requestAnimationFrame, instead of the
     * setInterval.
     *
     *  * It handles the input, updates, renders and clears the canvas.

     */
    StartGameLoop.prototype.gameLoop = function gameLoop() {
        requestAnimFrame(gameLoop);

        // removes last frame
        clear(canvas, canvContext);

        // handles user action
        handleInput(gameRef);

        // update the object for the frame
        update(canvas, mainMenuRef, gameRef);

        // render objects for the frame on screen
        render(canvContext, mainMenuRef, gameRef);

        // Reset player to idle if he's running and has stopped.
        // If this is not cleared here, the player will never stop running
        //
        if (gameRef.currentGameState == gameRef.gameStates.playing && gameRef.player.currentState == gameRef.player.states.run) {
            gameRef.player.currentState = gameRef.player.states.idle;
            gameRef.player.direction = 0;
        }
    };

    return StartGameLoop;

})();


/**
 * Initialises the game variables and game state.
 *
 * Hides the canvas context, game and main menu
 * variables from the global scope.
 */
(function main() {

    // Get the canvas element
    //
    canvas = document.getElementById("gameCanvas");

    // Get the canvas' context for drawing
    //
    var canvasContext = canvas.getContext('2d');

    // Initialise the game object, providing the canvas ot it
    var game = new Game(canvasContext);
    var mainMenu = new MainMenu('Title', canvasContext, game);

    var gameLoop = new StartGameLoop(canvasContext, game, mainMenu);

    gameLoop.gameLoop();

    /*return setInterval(function () {

     }, 1000 / 60);*/
})();