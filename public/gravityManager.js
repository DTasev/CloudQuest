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
    var GRAVITY_MULTIPLIER_INCREASE = 1.05;
    var GRAVITY_MAX_MULTIPLIER = 2;

    var gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;


    // TODO fix gravity while on platforms, cos keeps incrementing and falls through
    
    // todo track separate objects
    // but for now implement just for player
    this.applyGravity = function (gameObject) {

        console.log(gravityMultiplier);
        // Apply gravity if player is not jumping up
        //
        if (gameObject.currentState != player.states.jump) {

            gameObject.y += GRAVITY_CONSTANT * gravityMultiplier * gameObject.gravityWeight;

            gravityMultiplier *= GRAVITY_MULTIPLIER_INCREASE;

            if(gravityMultiplier > GRAVITY_MAX_MULTIPLIER){
                gravityMultiplier = GRAVITY_MAX_MULTIPLIER;
            }

            // to allow jumping once while falling remove this
            // TODO create a timer to allow a small window for the jump after falling
            if (fallingTimer > 30) {
                gameObject.currentState = player.states.falling;
                gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
            }

            fallingTimer++;

        } else {
            fallingTimer = 0;
            gravityMultiplier = INITIAL_GRAVITY_MULTIPLIER;
        }

        /*
         gravityMultiplier *= GRAVITY_MULTIPLIER_CHANGE;
         if (gravityMultiplier > GRAVITY_MAX_MULTIPLIER) {
         gravityMultiplier = GRAVITY_MAX_MULTIPLIER;
         }
         player.y += GRAVITY_CONSTANT*gravityMultiplier;
         }else{
         gravityMultiplier = INITIAL_MULTIPLIER;
         }
         PLAYER_MOVING = 0;

         */
    };

    return this;

})();