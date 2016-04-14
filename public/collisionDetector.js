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
     *
     * @param rectangle1
     * @param rectangle2
     * @returns {*}
     */
    this.rectangleCollision = function (rectangle1, rectangle2) {

        // check Y axis 1st
        var rectSides2 = loadRectangleSides(rectangle1);
        var rectSides1 = loadRectangleSides(rectangle2);

        // if intersecting return all intersections
        if (!(rectSides2[SIDE_LEFT] > rectSides1[SIDE_RIGHT] ||
            rectSides2[SIDE_RIGHT] < rectSides1[SIDE_LEFT] ||
            rectSides2[SIDE_TOP] > rectSides1[SIDE_BOTTOM] ||
            rectSides2[SIDE_BOTTOM] < rectSides1[SIDE_TOP])) {

            var checkLeft = rectangle1.getHorizontalCenter() > rectangle2.getHorizontalCenter(); // check if colliding on left
            var checkRight = rectangle1.getHorizontalCenter() < rectangle2.getHorizontalCenter(); // check if colliding on right
            //var checkBottom = rectangle1.getVerticalCenter() < rectangle2.getVerticalCenter(); // bottom vs top
            var checkBottom = (((rectSides1[SIDE_TOP] > rectSides2[SIDE_BOTTOM] - 2) && rectSides2[SIDE_BOTTOM] < rectSides1[SIDE_TOP] + 20));
            var checkTop = rectangle1.getVerticalCenter() > rectangle2.getVerticalCenter(); // top vs bottom

            return [checkLeft, checkRight, checkBottom, checkTop];

        } else {
            return false;
        }
    };

    this.outOfBoundsDetector = function (canvasContext, object) {
        if (object.x < 0 ||
            object.y < 0 ||
            object.x + object.width > canvasContext.x + canvasContext.width ||
            object.y + object.height > canvasContext.y + canvasContext.height) {

            return [
                object.x < 0,
                object.y < 0,
                object.x + object.width > canvasContext.x + canvasContext.width,
                object.y + object.height > canvasContext.y + canvasContext.height
            ];

        }else{
            return false;
        }
    };

    this.rectangleAndArcCollision = function (rectangle, circle) {
        //TODO
    };
    return this;
})();