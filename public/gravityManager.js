/**
 * Created by dimta on 13-Apr-16.
 */

/**
 * This class will receive all game objects, loop through each
 * and apply gravity.
 *
 * As all of the objects have x/y position on the screen,
 * so applying gravity would be moving their Y position
 * towards the bottom of the screen.
 *
 * @type {Function}
 */
var gravityManager = (function (){

    // Gravity constant that will be applied to all objects
    var GRAVITY_CONSTANT = 0.3;

    this.applyGravity = function (gameObjects) {
        for(var i = 0; i < gameObjects.length; i++){
            gameObjects[i].y += GRAVITY_CONSTANT;
        }
    };

    return this;

})();