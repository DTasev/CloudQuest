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

    function createCollisionArray(canvasContext, playerObject, gameObjects){
        // var i = 1 in order to skip checking the player collision with itself
        // because the player is in the gameObjects array as gameObject[0]
        var collisionResultsArray = [];
        for(var i = 1; i < gameObjects.length; i++){
            var collisionResult = collisionDetector.rectangleCollision(playerObject, gameObjects[i]);
            if (collisionResult) {
                collisionResultsArray.push({'object': gameObjects[i], 'collisionResult' : collisionResult});
            }
        }
        return collisionResultsArray;
    }
    this.checkCollision = function (canvasContext, playerObject, gameObjects){

        // handle player collision with context bounds
        var outOfBoundsResult = collisionDetector.outOfBoundsDetector(canvasContext, playerObject);
        if(outOfBoundsResult){
            console.log("player out of bounds" + outOfBoundsResult);
        }

        var collisionResultsArray = createCollisionArray(canvasContext, playerObject, gameObjects);

        var applyGravity = true;
        if (collisionResultsArray.length > 0) {
            for (var i = 0; i < collisionResultsArray.length; i++) {

                //console.log('Colliding with #' + collisionResultsArray.length + ' of platforms');

                // if one of the collisions is a platform don't apply gravity
                if (collisionResultsArray[i].collisionResult[2] == true)
                    applyGravity = false;
            }
        }
        if(applyGravity)
            gravityManager.applyGravity(playerObject);



        // not colliding with anything, apply gravity

    };

    return this;

})();