/**
 * Created by dimta on 13-Apr-16.
 */
var playerMovementManager = (function () {
    var INITIAL_MULTIPLIER = 1;
    var INITIAL_MULTIPLIER_CHANGE = 1.10;
    var MULTIPLIER_REDUCE = 0.001;
    var MAX_MULTIPLIER = 2;
    var MIN_MULTIPLIER_CHANGE = 1;

    // speed multiplier tracker
    var speedMultiplier = INITIAL_MULTIPLIER;
    var multiplierChange = INITIAL_MULTIPLIER_CHANGE;

    // internal direction tracker
    var direction;
    var START_JUMPING_SPEED = 5; // holds the value of the start jumping speed
    var CURRENT_SPEED = START_JUMPING_SPEED; // holds the value of the variable that changes to simulate
    var JUMPING_DAMPING = 0.955;

    /**
     * Todo explain running state
     * acceleration
     * @param playerObject
     */
    function runningState(playerObject) {
        switch (playerObject.direction) {
            case playerObject.navigation.left:

                // dampen speed increase with multiplier
                playerObject.x -= (playerObject.runningSpeed * speedMultiplier);

                // if direction stays the same, increase multiplier to accelerate speed
                if (direction == playerObject.navigation.left) {

                    if (speedMultiplier > MAX_MULTIPLIER) {
                        // cap multiplier, to have maximum reachable speed
                        speedMultiplier = MAX_MULTIPLIER;
                    }
                    if (multiplierChange < MIN_MULTIPLIER_CHANGE) {
                        multiplierChange = MIN_MULTIPLIER_CHANGE;
                    }

                    // increase multiplier to accelerate
                    console.log('Speed -> ' + playerObject.runningSpeed * speedMultiplier);
                    speedMultiplier *= multiplierChange;
                    multiplierChange -= multiplierChange * MULTIPLIER_REDUCE;

                } else { // if we have not been going left

                    // change direction to current
                    direction = playerObject.navigation.left;

                    // reset multiplier of speed, to remove any previous acceleration
                    speedMultiplier = INITIAL_MULTIPLIER;
                    multiplierChange = INITIAL_MULTIPLIER_CHANGE;
                }

                break;
            case playerObject.navigation.right: // right

                // damped speed increase with multiplier
                playerObject.x += (playerObject.runningSpeed * speedMultiplier);
                if (direction == playerObject.navigation.right) {
                    if (speedMultiplier > MAX_MULTIPLIER) {
                        speedMultiplier = MAX_MULTIPLIER;
                    }

                    if (multiplierChange < MIN_MULTIPLIER_CHANGE) {
                        multiplierChange = MIN_MULTIPLIER_CHANGE;
                    }


                    speedMultiplier *= multiplierChange;
                    multiplierChange -= multiplierChange * MULTIPLIER_REDUCE;

                } else { // if we have not been going right
                    direction = playerObject.navigation.right;

                    speedMultiplier = INITIAL_MULTIPLIER;
                    multiplierChange = INITIAL_MULTIPLIER_CHANGE;
                }

                break;
            default:
                break;
        }
        playerObject.direction = 0;
    }

    /**
     * todo explain jumping
     * @param playerObject
     */
    function jumpingState(playerObject) {
        
    }

    /**
     * todo explain:
     * @param playerDirection
     * @param playerObject
     */
    this.handleMovement = function (playerObject) {
        switch(playerObject.currentState){
            case player.states.run:
                runningState(playerObject);
                break;
            case player.states.jump:
                jumpingState(playerObject);
                break;
            default:
                break;
        }
    };
    return this;
})();