/**
 * Created by dimta on 13-Apr-16.
 */

/**
 * Contains methods that check for collision between game objects.
 * It does not perform any updates on the game objects themselves
 *
 * @type {Function}
 */
var collisionDetector = (function () {

    var SIDE_TOP = 0;
    var SIDE_RIGHT = 1;
    var SIDE_LEFT = 2;
    var SIDE_BOTTOM = 3;

    /**
     * Calculates the rectangle's sides
     * @param rectangle
     */
    this.loadRectangleSides = function (rectangle) {
        return [
            rectangle.y, // also top, as 0 member
            rectangle.x + rectangle.width, // also right as 1st member
            rectangle.x, // also left as 2nd member
            rectangle.y + rectangle.height // also bottom as 3rd member
        ];
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

        if (!(rectSides1[SIDE_RIGHT] < rectSides2[SIDE_LEFT] ||
            rectSides1[SIDE_LEFT] > rectSides2[SIDE_RIGHT] ||
            rectSides1[SIDE_BOTTOM] < rectSides2[SIDE_TOP] ||
            rectSides1[SIDE_TOP] > rectSides2[SIDE_BOTTOM])) {


            var leftCollision = rectangle1.getHorizontalCenter() > rectangle2.getHorizontalCenter(); // check if colliding on left

            var rightCollision = rectangle1.getHorizontalCenter() < rectangle2.getHorizontalCenter(); // check if colliding on right

            //var bottomCollision = rectangle1.getVerticalCenter() < rectangle2.getVerticalCenter(); // bottom vs top

            // - 2 AND + 10 are added to have a calculation with a bigger margin
            //
            var bottomCollision = (((rectSides1[SIDE_BOTTOM] - 5 < rectSides2[SIDE_TOP] + 5)));

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

        if (!(rectSides1[SIDE_RIGHT] < rectSides2[SIDE_LEFT] ||
            rectSides1[SIDE_LEFT] > rectSides2[SIDE_RIGHT] ||
            rectSides1[SIDE_BOTTOM] < rectSides2[SIDE_TOP] ||
            rectSides1[SIDE_TOP] > rectSides2[SIDE_BOTTOM])) {

            return true;
        }
    };


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

    this.checkUpperBounds = function (object) {
        return object.y <= 0;
    };

    this.checkLeftBounds = function (object) {
        return object.x <= 0;
    };

    this.checkRightBounds = function (object) {
        return object.x + object.width >= canvas.width;
    };

    this.checkLowerBounds = function (object) {
        return object.y + object.height/2 >= canvas.height;
    };

    return this;
})();