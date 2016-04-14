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

    this.checkCollision = function (canvasContext, playerObject, gameObjects){

        // handle player collision with context bounds
        var outOfBoundsResult = collisionDetector.outOfBoundsDetector(canvasContext, playerObject);
        if(outOfBoundsResult){
            console.log("player out of bounds" + outOfBoundsResult);
        }
        // var i = 1 in order to skip checking the player collision with itself
        // because the player is in the gameObjects array as gameObject[0]
        for(var i = 1; i < gameObjects.length; i++){
            var collisionResult = collisionDetector.rectangleCollision(playerObject, gameObjects[i]);
            if (collisionResult) {

                // if colliding handle player collision here
                if(collisionResult[2] == false)
                    gravityManager.applyGravity(playerObject);

                console.log(collisionResult);
                return collisionResult;
            }
        }
        // not colliding with anything, apply gravity
        gravityManager.applyGravity(playerObject);
        return [false, false, false, false];
    };

    return this;

})();