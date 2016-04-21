/**
 * The Game class, it contains all methods used by the main.js file
 * to update and render the game.
 */
var Game = (function () {

    var GAME_OVER_SCREEN_TIMER_DELAY = 100;
    var gameOver = false;

    var gameOverScreenTimer = 0;

    var newHighScore = false;


    function Game(canvasContext) {

        this.canvasContext = canvasContext;
        this.player = null;

        this.gameStates = {
            'menu': 0,
            'playing': 1,
            'gameOver': 2
        };

        // Set initial game state
        this.currentGameState = this.gameStates.menu;

        this.gameObjects = null;

    }


    /**
     * Function that initialises the keyboard controls for the player
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
     */
    Game.prototype.initialiseKeyboardControls = function initialiseKeyboardControls(FRAMES, playerObject) {

        new KeyboardController({

            // Left Arrow
            //
            37: function () {

                playerMovementManager.leftArrowControls(playerObject);

            },

            // Right Arrow
            //
            39: function () {

                playerMovementManager.rightArrowControls(playerObject, this);
            }
            ,

            // Down arrow
            //
            40: function () {

                playerMovementManager.downArrowControls(playerObject, this);
            }

            ,

            // Space bar
            //
            32: function () {

                playerMovementManager.jumpingControls(playerObject, this);
            }

        }, 1000 / FRAMES);
    };


    /**
     * Function that renders the playing state on screen.
     *
     * The function loops through the objects backwards.
     * It starts from the last until the first one.
     * Game.prototype is done on purpose, because the player is always
     * the first object in the array, so in order to be rendered
     * on top he has to be the last object rendered on the screen.
     *
     * It also renders the parallax background and the in-game score
     *
     * @param gameObjects The game's object that have to be rendered on screen.
     * @param canvasContext The canvas' context on which the object will be drawn
     */
    Game.prototype.renderPlayingState = function renderPlayingState(gameObjects, canvasContext) {

        parallaxBackground.renderBackground(canvasContext);

        scoreManager.renderScore(this.canvasContext);

        for (var i = gameObjects.length - 1; i >= 0; i--) {

            gameObjects[i].render(canvasContext);

        }
    };


    /**
     * Renders the menu on screen
     *
     * @param canvasContext
     * @param mainMenu
     */
    Game.prototype.renderMenuState = function renderMenuState(canvasContext, mainMenu) {
        mainMenu.render();
    };


    /**
     * Renders the game over screen
     * @param canvasContext
     */
    Game.prototype.renderGameOver = function renderGameOver(canvasContext) {

        canvasContext.fillStyle = 'rgb(0,0,0)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.font = '30px Georgia';
        canvasContext.fillStyle = "White";

        canvasContext.fillText('Game Over!', canvas.width / 2, canvas.height / 2);

        var currentScore = scoreManager.getCurrentScoreAndTimeSurvived();

        // If a new high score has been achieved, show appropriate message on screen
        //
        if (newHighScore) {

            canvasContext.fillText('New HIGH SCORE: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
            canvasContext.fillText('New HIGH SCORE for Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);

        } else {

            canvasContext.fillText('Current Score: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
            canvasContext.fillText('Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);

        }

    };


    /**
     *  Deletes the objects array and
     *  initialises the starting objects
     *
     */
    Game.prototype.initialiseGameObjects = function initialiseGameObjects() {

        // Sets the frames per second of the game.
        // Default value is 60, and the game is
        // intended to be played at 60 FPS
        //
        var FRAMES = 60;

        // Reset game objects array
        //
        this.gameObjects = [];

        this.player = new Player(140, 25, 35, 60, 1.5, 1);
        this.gameObjects.push(this.player);

        var basePlatform = new Platform(0, canvas.height - 50, canvas.width, 50, 0, 1, 'rgb(0,0,0)');
        this.gameObjects.push(basePlatform);

        var coin = new Coin(50, 50, 1);
        var coin1 = new Coin(70, 50, 1);
        this.gameObjects.push(coin);
        this.gameObjects.push(coin1);

        // Reset all game settings
        //
        scoreManager.startTimer();
        platformManager.resetPlatformGeneration();
        coinManager.resetCoinGeneration();
        gameScrollManager.resetScrollSpeed();
        difficultyManager.resetDifficultyTimers();
        parallaxBackground.resetCloudPositions();


        // Add starting platform for player to ensure there's something he can fall on
        //
        var platform = new Platform(50, 140, 150, 40, 0.2, 4);

        this.gameObjects.push(platform);


        // Initialise all of the keyboard controls for all the states
        //
        this.initialiseKeyboardControls(FRAMES, this.player);

        // Set the game object in the player movement manager
        // can be used to have different keyboard controls
        // for the different states, this is implemented,
        // but only the playing state controls are used
        //
        playerMovementManager.setGameObject(this);

    };


    Game.prototype.updateMenuState = function updateMenuState(canvas, mainMenu) {
        mainMenu.update();
    };


    /**
     * Updates the game over screen.
     *
     * The game over screen is timed out after 2000millis
     * and switched back to the main menu state
     */
    Game.prototype.updateGameOverState = function updateGameOverState() {

        // boolean to make sure this is executed only ONCE
        //
        if (gameOver) {

            // Stop the timer and score counting
            //
            scoreManager.stopTimer();

            var currentScore = scoreManager.getCurrentScoreAndTimeSurvived();
            var savedScore = scoreManager.getSavedScoreAndTimeSurvived();

            // Check if the current score is a high score
            //
            newHighScore = currentScore.score > savedScore.score;

            // If a new high score has been achieved save locally
            //
            if (newHighScore) {
                scoreManager.saveScoreLocally();
            }

            gameOver = false;

        }

        gameOverScreenTimer++;

        // Delay the game over screen timer
        if (gameOverScreenTimer >= GAME_OVER_SCREEN_TIMER_DELAY) {
            this.currentGameState = this.gameStates.menu;
            gameOverScreenTimer = 0;
        }
    };


    /**
     * Removes any objects that are out of bounds from the game objects array.
     *
     * Game.prototype excludes the player, as if he goes under the screen
     * the game is over.
     *
     * @param gameObjects
     */
    Game.prototype.removeOutOfBoundsObjects = function removeOutOfBoundsObjects(gameObjects) {

        for (var i = 1; i < gameObjects.length; i++) {

            // Check if the current platform's width or height are equal or below 0
            // if they are then they must be deleted
            //
            if (collisionDetector.checkLowerBounds(gameObjects[i]) || ((gameObjects[i].width < 0) || (gameObjects[i].height < 0))) {

                if (gameObjects[i].constructor == Coin) {

                    // remove the coin from the game objects array
                    //
                    coinManager.removeCoin(i, gameObjects);

                }

                // if the player is colliding with a platform object
                //
                try {
                    if (gameObjects[i].constructor == Platform) {

                        platformManager.removePlatform(i, gameObjects);

                        // else not colliding with anything, apply gravity
                    }
                } catch (e) {
                    debugger;


                }
            }
        }
    };


    /**
     * This function updates the playing state of the game.
     *
     * It removes any objects out of bounds.
     *
     * Afterwards it handles the collision between objects using the
     * collisionResolver class.
     *
     * After all the collision has been processed and handled,
     * the method then proceeds to deflate the platforms, and
     * generate new ones if the platform count is below
     * the maximum.
     *
     * Then the game is scrolled, the game updated and the coins
     * generated on screen.
     *
     * The last check
     *
     */
    Game.prototype.updatePlayingState = function updatePlayingState(canvas, playerObject, gameObjects) {

        if (collisionDetector.checkLowerBounds(playerObject)) {

            this.currentGameState = this.gameStates.gameOver;
            gameOver = true;

            return;
        }

        this.removeOutOfBoundsObjects(gameObjects);


        // Handle the collision and gravity between the objects and player
        //
        collisionResolver.checkCollision(playerObject, gameObjects);


        // Handles the deflation and removal of platforms from
        // the gameObjects and renderArray arrays
        //
        platformManager.handleDeflation(canvas, gameObjects);


        // Generates platforms and adds them to the gameObjects
        // and renderArray arrays
        //
        platformManager.generatePlatforms(gameObjects);


        // Scrolls all of the game objects down
        //
        gameScrollManager.scrollGame(gameObjects);

        // Generating new coins in the game
        //
        coinManager.generateCoins(gameObjects);

        // Updates difficulty, increasing it over time
        //
        difficultyManager.updateDifficulty();
    };


    return Game;
})();