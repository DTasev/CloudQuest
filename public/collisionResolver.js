/**
 * Created by dimta on 13-Apr-16.
 */

/**
 * Uses the collisionManager and gravityManager class to resolve the collision between
 * gameObjects, and apply gravity to objects if they aren't touching ground
 *
 * This class will modify game classes' attributes to reflect the collisions, or gravity
 * @type {Function}
 */
var collisionResolver = (function () {

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

    this.checkCollision = function (playerObject, gameObjects) {

        var collisionResultsArray = createCollisionArray(playerObject, gameObjects);

        var applyGravity = true;

        if (collisionResultsArray.length > 0) {

            for (var i = 0; i < collisionResultsArray.length; i++) {


                // if the player is colliding with a coin object
                //
                if (collisionResultsArray[i].object.constructor == Coin) {

                    // remove the coin from the game objects array
                    //
                    coinManager.removeCoin(collisionResultsArray[i].positionInGameObjects, gameObjects);

                    // increase the score of the game
                    //
                    scoreManager.increaseScore(collisionResultsArray[i].object);

                }

                // if the player is colliding with a platform object
                if (collisionResultsArray[i].object.constructor == Platform) {

                    if (collisionResultsArray[i].collisionResult[2] == true) {

                        applyGravity = false;


                    }

                    // else not colliding with anything, apply gravity
                }
            }
        }

        if (applyGravity) {

            gravityManager.applyGravity(playerObject);

        }
        else {

            // Change the player state to idle and reset his direction
            // will only be changed if the previous state of the player
            // was falling. This block will only be executed after
            // gravity must no longer by applied.
            //
            // If the if statement is removed the player will always be assigned
            // idle state while not jumping/falling
            //
            if (playerObject.currentState == player.states.falling) {

                playerObject.currentState = player.states.idle;

                playerObject.direction = 0;

            }

            gravityManager.resetGravity();

        }

    };

    return this;

})();