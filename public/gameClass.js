/**
 * Created by dimta on 19-Apr-16.
 */

var canvas;


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
     *
     * @param gameObjects The game's object that have to be rendered on screen.
     * @param canvasContext The canvas' context on which the object will be drawn
     */
    Game.prototype.renderPlayingState = function renderPlayingState(gameObjects, canvasContext) {

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

        // Do some checks to see if the scores are new high scores
        //
        if (newHighScore) {

            canvasContext.fillText('New HIGH SCORE: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
            canvasContext.fillText('New HIGH SCORE for Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);

        } else {

            canvasContext.fillText('Current Score: ' + currentScore.score, canvas.width / 2, canvas.height / 2 + 30);
            canvasContext.fillText('Time Survived: ' + currentScore.timeSurvived, canvas.width / 2, canvas.height / 2 + 60);

        }

    };

    Game.prototype.changeState = function () {
        this.currentGameState = this.gameStates.menu;
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

        var speed = 0.2;
        var deflateType = 4;
        for (var i = 50; i < 100; i += 150) {

            var platform = new Platform(i, i + 50, 150, 40, speed, deflateType++, 'rgb(0,0,0)');

            speed += 0.08;

            this.gameObjects.push(platform);
        }


        // Initialise all of the keyboard controls for all the states
        //
        this.initialiseKeyboardControls(FRAMES, this.player);
        playerMovementManager.setGameObject(this);

    };

    Game.prototype.updateMenuState = function updateMenuState(canvas, mainMenu) {
        mainMenu.update();
    };

    /**
     * Updates the game over screen. Also times it out after 2000millis
     * and switches back to the main menu state
     */
    Game.prototype.updateGameOverState = function updateGameOverState() {

        if (gameOver) {

            scoreManager.stopTimer();

            var currentScore = scoreManager.getCurrentScoreAndTimeSurvived();
            var savedScore = scoreManager.getSavedScoreAndTimeSurvived();

            newHighScore = currentScore.score > savedScore.score;

            if (newHighScore) {
                scoreManager.saveScoreLocally();
            }

            gameOver = false;

        }

        gameOverScreenTimer++;

        // Delay the game over screen timer
        if(gameOverScreenTimer >= GAME_OVER_SCREEN_TIMER_DELAY){
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

        for (var i = 0; i < gameObjects.length; i++) {

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


        gameScrollManager.scrollGame(gameObjects);

        scoreManager.updateScore(this.canvasContext);

        coinManager.generateCoins(gameObjects);

        difficultyManager.updateDifficulty();
    };

    return Game;
})();