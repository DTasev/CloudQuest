/**
 * Contains methods that check for collision between game objects.
 * There are different versions of some of the methods providing a
 * slower, but more specific collision, or a fast collision.
 *
 * It does not perform any updates on the game objects themselves.
 *
 * @author Dimitar Tasev
 *
 */
var collisionDetector = (function () {

    /**
     * Calculates the rectangle's sides
     * @param rectangle
     */
    this.loadRectangleSides = function (rectangle) {
        return {
            'top': rectangle.y, // also top, as 0 member
            'right': rectangle.x + rectangle.width, // also right as 1st member
            'left': rectangle.x, // also left as 2nd member
            'bottom': rectangle.y + rectangle.height // also bottom as 3rd member
        };
    };

    /**
     * A precise rectangle collision detection.
     *
     * It calculates which sides exactly are colliding between
     * the objects.
     *
     * @param rectangle1
     * @param rectangle2
     * @returns {*} Returns an array containing the result of collision between each side
     */
    this.preciseRectangleCollision = function (rectangle1, rectangle2) {

        var rectSides1 = loadRectangleSides(rectangle1);
        var rectSides2 = loadRectangleSides(rectangle2);

        if (!(rectSides1.right < rectSides2.left ||
            rectSides1.left > rectSides2.right ||
            rectSides1.bottom < rectSides2.top ||
            rectSides1.top > rectSides2.bottom)) {


            var leftCollision = rectangle1.getHorizontalCenter() > rectangle2.getHorizontalCenter(); // check if colliding on left

            var rightCollision = rectangle1.getHorizontalCenter() < rectangle2.getHorizontalCenter(); // check if colliding on right

            //var bottomCollision = rectangle1.getVerticalCenter() < rectangle2.getVerticalCenter(); // bottom vs top

            // - 2 AND + 10 are added to have a calculation with a bigger margin
            //
            // This is the reason the player sometimes look like he's inside the platform,
            // however without it the collision doesn't work properly
            //
            var bottomCollision = (((rectSides1.bottom - 5 < rectSides2.top + 5)));

            var topCollision = rectangle1.getVerticalCenter() > rectangle2.getVerticalCenter(); // top vs bottom

            return [leftCollision, rightCollision, bottomCollision, topCollision];

        } else {
            return false;
        }
    };


    /**
     * Fast and less precise version of the rectangle collision.
     *
     * It returns if the objects are currently colliding somewhere or not.
     *
     * @param rectangle1
     * @param rectangle2
     * @returns {boolean} returns true if the objects are currently colliding somewhere
     */
    this.fastRectangleCollision = function (rectangle1, rectangle2) {

        var rectSides1 = loadRectangleSides(rectangle1);
        var rectSides2 = loadRectangleSides(rectangle2);

        if (!(rectSides1.right < rectSides2.left ||
            rectSides1.left > rectSides2.right ||
            rectSides1.bottom < rectSides2.top ||
            rectSides1.top > rectSides2.bottom)) {

            return true;
        }
    };


    /**
     * Checks if the object is out of bounds anywhere on the screen.
     *
     * It will return true regardless of which bound the object is out.
     *
     * @param object
     * @returns {*}
     */
    this.outOfBoundsDetector = function (object) {
        if (object.x < 0 ||
            object.y < 0 ||
            object.x + object.width > canvas.width ||
            object.y + object.height > canvas.height) {

            return [
                object.x < 0,
                object.y < 0,
                object.x + object.width > canvas.width,
                object.y + object.height > canvas.height
            ];

        } else {
            return false;
        }
    };

    /**
     * Checks if the object is above the canvas.
     *
     * @param object
     * @returns {boolean}
     */
    this.checkUpperBounds = function (object) {
        return object.y <= 0;
    };

    /**
     * Checks if the object is outside of the left side of the canvas.
     *
     * @param object
     * @returns {boolean}
     */
    this.checkLeftBounds = function (object) {
        return object.x <= 0;
    };

    /**
     * Checks if the object is outside of the right side of the canvas.
     * @param object
     * @returns {boolean}
     */
    this.checkRightBounds = function (object) {
        return object.x + object.width >= canvas.width;
    };

    /**
     * Checks if the object is below the canvas.
     *
     * @param object
     * @returns {boolean}
     */
    this.checkLowerBounds = function (object) {
        return object.y + object.height / 2 >= canvas.height;
    };

    return this;

})();