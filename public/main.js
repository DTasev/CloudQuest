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
 * @param gameObjects
 * @param mainMenu The mainMenu object
 * @param game
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
 * The main loop of the game.
 * It handles the input, updates, renders and clears the canvas.
 *
 * @param canvas The HTML5 Canvas Object
 * @param canvasContext The Canvas' context
 * @param mainMenu The main menu class that will be updated/rendered
 * @param game The game class object
 */
function gameLoop(canvas, canvasContext, mainMenu, game) {

    // removes last frame
    clear(canvas, canvasContext);

    // handles user action
    handleInput(game);

    // update the object for the frame
    update(canvas, mainMenu, game);

    // render objects for the frame on screen
    render(canvasContext, mainMenu, game);

    // Reset player to idle if he's running and has stopped.
    // If this is not cleared here, the player will never stop running
    //
    if (game.currentGameState == game.gameStates.playing && game.player.currentState == game.player.states.run) {
        game.player.currentState = game.player.states.idle;
        game.player.direction = 0;
    }
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

    var game = new Game(canvasContext);
    var mainMenu = new MainMenu('Title', canvasContext, game);


    return setInterval(function () {
        gameLoop(canvas, canvasContext, mainMenu, game)
    }, 1000 / 60);
})();