/**
 * Created by dimta on 13-Apr-16.
 */

/**
 * This class applies gravity to all objects on the screen,
 * if they are in a state to be affected by gravity.
 *
 */
var gravityManager = (function () {

    var fallingTimer = 0;

    // Gravity constant that will be applied to all objects
    //
    var GRAVITY_CONSTANT = 1;

    var INITIAL_GRAVITY_MULTIPLIER = 1;

    // Increases the multiplier over time to simulate ground acceleration over time
    //
    var GRAVITY_MULTIPLIER_INCREASE = 1.25;

    // The maximum value the multiplier can reach
    var GRAVITY_MAX_MULTIPLIER = 4.5;

    var gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;

    /**
     * Applies gravity to the player object.
     *
     * @param playerObject The player object to which gravity will be applied.
     */
    this.applyGravityToPlayer = function (playerObject) {

        // Apply gravity if player is not jumping up
        //
        if (playerObject.currentState != playerObject.states.jump) {

            // Increase the player's Y position to go down
            //
            playerObject.y += GRAVITY_CONSTANT * gravityMultiplier * playerObject.gravityWeight;

            // Increase the multiplier to simulate acceleration over time
            //
            gravityMultiplier *= GRAVITY_MULTIPLIER_INCREASE;


            // Capping the multiplier value so it doesn't become too big
            //
            if(gravityMultiplier > GRAVITY_MAX_MULTIPLIER){
                gravityMultiplier = GRAVITY_MAX_MULTIPLIER;
            }


            // This allow a jumping window of around 60 frames
            // in which the player is able to jump while falling
            //
            if (fallingTimer > 30) {
                playerObject.currentState = playerObject.states.falling;
            }

            fallingTimer++;

        } else {

            fallingTimer = 0;
            gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
        }

    };

    /**
     * Resets the gravity acceleration multiplier
     */
    this.resetGravity = function () {
        gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
    };



    return this;

})();