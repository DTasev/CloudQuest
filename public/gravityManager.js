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
    var GRAVITY_CONSTANT = 1;
    var applyGravity = true;

    this.setGravity = function (gravityValue) {
        applyGravity = gravityValue;
    };

    // todo track separate objects
    // but for now implement just for player
    this.applyGravity = function (gameObject) {
        if(applyGravity && gameObject.currentState != player.states.jump){

            gameObject.y += GRAVITY_CONSTANT*gameObject.gravityWeight;

            // to allow jumping once while falling remove this
            // TODO create a timer to allow a small window for the jump after falling
            gameObject.currentState = player.states.falling;
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