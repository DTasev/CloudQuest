/**
 * Uses the collisionManager and gravityManager class to resolve the collision between
 * gameObjects, and apply gravity to objects if they aren't touching ground
 *
 * This class will modify game classes' attributes to reflect the collisions, or gravity
 * @author Dimitar Tasev
 */
var collisionResolver = (function () {

    /**
     * Creates an array that contains all the objects that the
     * player is currently colliding with.
     *
     * @param playerObject The player object reference
     * @param gameObjects All game objects
     * @returns {Array} An array containing all of the objects that the player is currently colliding with
     *
     */
    function createCollisionArray(playerObject, gameObjects) {

        var collisionResultsArray = [];

        // var i = 1 in order to skip checking the player collision with itself
        // because the player is in the gameObjects array as gameObject[0]
        //
        for (var i = 1; i < gameObjects.length; i++) {

            var collisionResult = collisionDetector.preciseRectangleCollision(playerObject, gameObjects[i]);

            if (collisionResult) {

                collisionResultsArray.push({
                    'object': gameObjects[i],
                    'positionInGameObjects': i,
                    'collisionResult': collisionResult
                });

            }
        }
        return collisionResultsArray;
    }

    /**
     * Action performed when player is colliding with a coin
     *
     * @param collisionResultsArray
     * @param i Position of the coin object in the game objects array
     * @param gameObjects The game objects array reference
     */
    function collisionWithCoin(collisionResultsArray, i, gameObjects) {

        // remove the coin from the game objects array
        //
        coinManager.removeCoin(collisionResultsArray[i].positionInGameObjects, gameObjects);

        // increase the score of the game
        //
        scoreManager.increaseScore(collisionResultsArray[i].object);

        // Play coin collect sound
        //
        soundManager.play(soundManager.sounds.coin);
    }

    /**
     * Checks for collision between the player objects and the game objects.
     *
     * Depending on the type of the game objects the player is colliding with
     * different branches of the code are executed.
     *
     * E.g. if the player is colliding with a coin, the coin is collected.
     * If the player is colliding with a platform on the bottom, the player
     * is not affected by gravity.
     *
     * @param playerObject The player object reference
     * @param gameObjects All game objects
     *
     */
    this.checkCollision = function (playerObject, gameObjects) {

        var collisionResultsArray = createCollisionArray(playerObject, gameObjects);

        // Assume that we have to apply gravity
        //
        var mustApplyGravity = true;

        // Check if the player is currently colliding with anything
        //
        if (collisionResultsArray.length > 0) {

            for (var i = 0; i < collisionResultsArray.length; i++) {

                // if the player is colliding with a coin object
                //
                if (collisionResultsArray[i].object.constructor == Coin) {

                    collisionWithCoin(collisionResultsArray, i, gameObjects);

                }

                // if the player is colliding with a platform object
                //
                if (collisionResultsArray[i].object.constructor == Platform) {

                    // if the collision is on the bottom, then do not apply gravity
                    //
                    if (collisionResultsArray[i].collisionResult[2] == true) {

                        mustApplyGravity = false;

                    }
                }
            }
        }

        if (mustApplyGravity) {

            gravityManager.applyGravityToPlayer(playerObject);

        } else {

            // Reset the player's state if gravity is not affecting him anymore.
            //
            if (playerObject.currentState == playerObject.states.falling) {

                playerObject.currentState = playerObject.states.idle;

                playerObject.direction = 0;

            }

            // Reset the gravity's acceleration method as it is no longer
            // affecting the player object
            //
            gravityManager.resetGravity();

        }

    };

    return this;

})();