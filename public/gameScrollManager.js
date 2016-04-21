/**
 * This class scrolls all of the objects, with an adjustable speed
 *
 * @author Dimitar Tasev
 */
var gameScrollManager = (function () {

    this.scrollingSpeed = 0.5;

    /**
     * Scrolls all of the game objects with the specified speed.
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
            gameObjects[i].y += this.scrollingSpeed;
        }

    };

    return this;
})();