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

        // Loop starts from one to avoid scrolling down
        // the player object
        //
        for(var i = 1; i < gameObjects.length; i++){
            gameObjects[i].y += 0.5;
        }
    };
    
    return this;
})();