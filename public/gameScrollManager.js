/**
 * This class scrolls all of the objects, with an adjustable speed
 *
 * @author Dimitar Tasev
 */
var gameScrollManager = (function () {

    var INITIAL_SCROLLING_SPEED = 0.5;
    this.scrollingSpeed = INITIAL_SCROLLING_SPEED;

    /**
     * Scrolls aff of the game objects the specified speed.
     *
     * The speed can be increased to increase difficulty.
     *
     * @param gameObjects All of the game objects in the game
     */
    this.scrollGame = function (gameObjects) {

        // Scrolls all game objects down, including
        // the player object
        //
        for (var i = 0; i < gameObjects.length; i++) {
            gameObjects[i].y += scrollingSpeed;
        }

    };


    /**
     * Reset's the game's scrolls speed upon death
     */
    this.resetScrollSpeed = function () {
        this.scrollingSpeed = INITIAL_SCROLLING_SPEED;
    };


    return this;
})();