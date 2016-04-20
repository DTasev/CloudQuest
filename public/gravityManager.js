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
var gravityManager = (function () {

    var fallingTimer = 0;

    // Gravity constant that will be applied to all objects
    //
    var GRAVITY_CONSTANT = 1;

    var INITIAL_GRAVITY_MULTIPLIER = 1;
    var GRAVITY_MULTIPLIER_INCREASE = 1.25;
    var GRAVITY_MAX_MULTIPLIER = 4.5;

    var gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;

    /**
     * Applies gravity to the given game object.
     *
     * Currently the gravity is only applied to the player object.
     *
     * @param playerObject The player object to which gravity will be applied.
     */
    this.applyGravity = function (playerObject) {

        // Apply gravity if player is not jumping up
        //
        if (playerObject.currentState != player.states.jump) {

            playerObject.y += GRAVITY_CONSTANT * gravityMultiplier * playerObject.gravityWeight;

            gravityMultiplier *= GRAVITY_MULTIPLIER_INCREASE;

            if(gravityMultiplier > GRAVITY_MAX_MULTIPLIER){
                gravityMultiplier = GRAVITY_MAX_MULTIPLIER;
            }


            // This allow a jumping window of around 30 frames
            // in which the player is able to jump while falling
            //
            if (fallingTimer > 30) {
                playerObject.currentState = player.states.falling;
            }

            fallingTimer++;

        } else {

            fallingTimer = 0;
            gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
        }

    };

    this.resetGravity = function () {
        gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
    };



    return this;

})();