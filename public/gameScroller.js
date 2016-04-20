/**
 * Created by dimta on 18-Apr-16.
 */

var gameScroller = (function () {

    this.scrollingSpeed = 0.5;

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

    return this;
})();