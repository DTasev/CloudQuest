/**
 * Created by dimta on 13-Apr-16.
 */
var playerMovementManager = (function () {

    // Initial acceleration value
    //
    var INITIAL_ACCELERATION_MULTIPLIER = 1;

    // The maximum multiplier value of the acceleration
    //
    var MAX_ACCELERATION_MULTIPLIER = 3;

    var accelerationMultiplier = INITIAL_ACCELERATION_MULTIPLIER;

    // Initial value of the multiplier
    // increase that allows for a more smoother
    // acceleration by slowly increasing the
    // multiplier's value
    //
    var INITIAL_MULTIPLIER_INCREASE = 1.20;

    // Value that dampens the multiplier increase
    // so that it looks even smoother over time.
    // This makes it so that the higher the speed is,
    // the slower the acceleration is, thus making
    // it look a bit more realistic
    //
    var MULTIPLIER_DAMPING = 0.99;

    // The minimum value for the multiplier increase.
    // Going below 1 will start slowing the player down.
    //
    var MIN_MULTIPLIER_INCREASE = 1;

    var accelerationMultiplierIncrease = INITIAL_MULTIPLIER_INCREASE;

    // internal direction tracker
    // used to check if direction of the
    // player object has changed
    //
    var direction;

    /**
     * This method handles the player's movement to the right.
     *
     * @param playerObject
     */
    function runningRight(playerObject) {

        // Dampen speed increase with multiplier
        // to simulate acceleration
        //
        // Here we subtract from the player's X value so that we move
        // to the left of the screen
        //
        playerObject.x += (playerObject.runningSpeed * accelerationMultiplier);


        // If we keep going in a direction
        // this block will be executed repeatedly
        // thus giving the acceleration of the player.
        //
        // The acceleration multiplier value is also
        // dampened, so that at a higher speed
        // the player speeds up less that he would at the start
        //
        if (direction == playerObject.navigation.right) {

            // Capping the accelerator value with the MAX_ACCELERATION_MULTIPLIER,
            // otherwise it will keep on multiplying
            //
            if (accelerationMultiplier >= MAX_ACCELERATION_MULTIPLIER) {

                accelerationMultiplier = MAX_ACCELERATION_MULTIPLIER;

            // if the multiplier isn't at it's maximum value
            } else {

                accelerationMultiplier *= accelerationMultiplierIncrease;
            }

            // Capping the multiplier increase to the minimum value it can have
            //
            if (accelerationMultiplierIncrease < MIN_MULTIPLIER_INCREASE) {

                accelerationMultiplierIncrease = MIN_MULTIPLIER_INCREASE;

            // if multiplier is not at the minimum value
            } else {

                accelerationMultiplierIncrease *= MULTIPLIER_DAMPING;
            }

        // If the player has not been going right previously
        // set right as the new direction
        //
        // Reset any previous accelerations from moving
        // in the other direction
        //
        } else {

            // update direction variable to hold the current direction
            direction = playerObject.navigation.right;

            accelerationMultiplier = INITIAL_ACCELERATION_MULTIPLIER;
            accelerationMultiplierIncrease = INITIAL_MULTIPLIER_INCREASE;
        }
    }

    /**
     * This method handles the player's movement to the left.
     *
     * @param playerObject
     */
    function runningLeft(playerObject) {

        // Dampen speed increase with multiplier
        // to simulate acceleration.
        //
        // Here we subtract from the player's X value so that we move
        // to the left of the screen
        //
        playerObject.x -= (playerObject.runningSpeed * accelerationMultiplier);

        // If we keep going in a direction
        // this block will be executed repeatedly
        // thus giving the acceleration of the player.
        //
        // The acceleration multiplier value is also
        // dampened, so that at a higher speed
        // the player speeds up less that he would at the start
        //
        if (direction == playerObject.navigation.left) {

            // Capping the accelerator value with the MAX_ACCELERATION_MULTIPLIER,
            // otherwise it will keep on multiplying
            //
            if (accelerationMultiplier > MAX_ACCELERATION_MULTIPLIER) {

                accelerationMultiplier = MAX_ACCELERATION_MULTIPLIER;

            // if the multiplier isn't at it's maximum value
            } else {

                accelerationMultiplier *= accelerationMultiplierIncrease;

            }

            // Capping the multiplier increase to the minimum value it can have
            //
            if (accelerationMultiplierIncrease < MIN_MULTIPLIER_INCREASE) {

                accelerationMultiplierIncrease = MIN_MULTIPLIER_INCREASE;

            // if multiplier is not at the minimum value
            }else{

                accelerationMultiplierIncrease *= MULTIPLIER_DAMPING;

            }

        // If the player has not been going right previously
        // set right as the new direction
        //
        // Reset any previous accelerations from moving
        // in the other direction
        //
        } else {

            // update direction variable to hold the current direction
            direction = playerObject.navigation.left;

            // reset multiplier of speed, to remove any previous acceleration
            accelerationMultiplier = INITIAL_ACCELERATION_MULTIPLIER;
            accelerationMultiplierIncrease = INITIAL_MULTIPLIER_INCREASE;
        }
    }


    // The start jumping speed
    //
    var START_JUMPING_SPEED = 10;

    // The minimum jumping speed
    // when this speed is reached the jump is over
    // and the player must start falling
    //
    var MIN_JUMPING_SPEED = 1;

    var currentJumpingSpeed = START_JUMPING_SPEED;

    // The current jumping speed is dampened
    // down to the value of MIN_JUMPING_SPEED.
    //
    // This makes the jumping decelerate the higher
    // it gets thus imitating the effect of gravity.
    //
    //
    var JUMPING_DAMPING = 0.955;

    /**
     * This function is acts upon the player only of he is
     * currently in the jumping state.
     *
     * @param playerObject The player object that will be changed if jumping
     */
    function handleJumping(playerObject) {

        // checking if the player object is currently in a jump state
        //
        if (playerObject.currentState == player.states.jump) {


            // Increase the player's height until the
            // minimum jumping speed is reached
            //
            if (currentJumpingSpeed > MIN_JUMPING_SPEED) {

                playerObject.y -= currentJumpingSpeed;

                // Dampen the jumping speed
                //
                currentJumpingSpeed = currentJumpingSpeed * JUMPING_DAMPING;

            // If the current jumping speed is the minimal one
            // then the jump is over and the player is moved to
            // the falling state, so that gravity can activate
            //
            } else {

                playerObject.currentState = player.states.falling;

                // Reset the current jumping speed for consecutive jumps
                //
                currentJumpingSpeed = START_JUMPING_SPEED;
            }
        } else {

            // The current jumping speed is reset here, otherwise
            // if the player jump, presses down to land earlier
            // and then jumps again without moving the current
            // jumping speed is not reset
            //
            currentJumpingSpeed = START_JUMPING_SPEED;
        }

    }

    /**
     * Handles the player's movement depending on his current state
     * and the direction that he is going.
     *
     * It handles the player's movement to the left or right.
     * It also handles the player's jumping.
     *
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
    }


    /**
     * Resets all of the variables used to player's acceleration.
     *
     * This includes the variables used for acceleration when running
     * to the left or right (accelerationMultiplier and accelerationMultiplierIncrease).
     */
    function resetAcceleration() {
        // reset multiplier of speed, to remove any previous acceleration
        accelerationMultiplier = INITIAL_ACCELERATION_MULTIPLIER;
        accelerationMultiplierIncrease = INITIAL_MULTIPLIER_INCREASE;
    }

    /**
     * Handles the player's movement depending on his current state
     * and the direction that he is going.
     *
     * This function does not execute any movement code if the
     * It handles the player's movement to the left or right.
     * It also handles the player's jumping.
     *
     *
     * @param playerObject
     */
    this.handleMovement = function (playerObject) {

        // If player is not idle, handle movement
        //
        if (playerObject.currentState != player.states.idle) {

            movingState(playerObject);

        // If player is idle, reset all acceleration variables
        // so that the next movement doesn't start with acceleration
        //
        } else {

            resetAcceleration();
        }
    };

    return this;

})();