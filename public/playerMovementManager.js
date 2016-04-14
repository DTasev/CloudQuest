/**
 * Created by dimta on 13-Apr-16.
 */
var playerMovementManager = (function () {
    // speed multiplier tracker
    var INITIAL_MULTIPLIER = 1;
    var MAX_MULTIPLIER = 3;
    var speedMultiplier = INITIAL_MULTIPLIER;

    var INITIAL_MULTIPLIER_CHANGE = 1.10;
    var MULTIPLIER_DAMPING = 0.995;
    var MIN_MULTIPLIER_CHANGE = 1;
    var multiplierChange = INITIAL_MULTIPLIER_CHANGE;

    // internal direction tracker
    // used to check if direction of the
    // player object has changed
    //
    var direction;

    // holds the value of the start jumping speed
    //
    var START_JUMPING_SPEED = 10;

    // holds the value of the variable that changes to simulate
    //
    var currentSpeed = START_JUMPING_SPEED;
    var JUMPING_DAMPING = 0.955;

    var jumpCounter = 0;

    function runningRight(playerObject) {
        // damped speed increase with multiplier
        //
        playerObject.x += (playerObject.runningSpeed * speedMultiplier);
        if (direction == playerObject.navigation.right) {
            if (speedMultiplier > MAX_MULTIPLIER) {
                speedMultiplier = MAX_MULTIPLIER;
            }

            if (multiplierChange < MIN_MULTIPLIER_CHANGE) {
                multiplierChange = MIN_MULTIPLIER_CHANGE;
            }

            speedMultiplier *= multiplierChange;
            multiplierChange *= MULTIPLIER_DAMPING;


        } else { // if we have not been going right
            direction = playerObject.navigation.right;

            speedMultiplier = INITIAL_MULTIPLIER;
            multiplierChange = INITIAL_MULTIPLIER_CHANGE;
        }
    }

    function runningLeft(playerObject) {

        // dampen speed increase with multiplier
        //
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
            multiplierChange *= MULTIPLIER_DAMPING;

        } else { // if we have not been going left

            // change direction to current
            direction = playerObject.navigation.left;

            // reset multiplier of speed, to remove any previous acceleration
            speedMultiplier = INITIAL_MULTIPLIER;
            multiplierChange = INITIAL_MULTIPLIER_CHANGE;
        }
    }

    function handleJumping(playerObject) {

        // checking if the player object is currently in a jump state
        //
        if (playerObject.currentState == player.states.jump) {
            if (currentSpeed > 0.8) {
                playerObject.y -= currentSpeed;
                currentSpeed = currentSpeed * JUMPING_DAMPING;
                jumpCounter++;
            } else {
                playerObject.currentState = player.states.falling;
                jumpCounter = 0;
                currentSpeed = START_JUMPING_SPEED;
            }
        } else {
            jumpCounter = 0;
            currentSpeed = START_JUMPING_SPEED;
        }
    }

    /**
     * Todo explain running state
     * acceleration
     * @param playerObject
     */
    function movingState(playerObject) {

        handleJumping(playerObject);

        switch (playerObject.direction) {

            // case going LEFT
            //
            case playerObject.navigation.left:

                runningLeft(playerObject);
                break;

            // case going RIGHT
            //
            case playerObject.navigation.right:

                runningRight(playerObject);
                break;

            default:
                break;
        }
        playerObject.direction = 0;
    }

    /**
     *
     */
    function resetAcceleration() {
        // reset multiplier of speed, to remove any previous acceleration
        speedMultiplier = INITIAL_MULTIPLIER;
        multiplierChange = INITIAL_MULTIPLIER_CHANGE;
    }

    /**
     * todo explain:
     * @param playerObject
     */
    this.handleMovement = function (playerObject) {
        console.log('State -> ' + playerObject.currentState);
        if (player.currentState != player.states.idle) {
            movingState(playerObject);
        } else {
            resetAcceleration();
        }
    };
    return this;
})();