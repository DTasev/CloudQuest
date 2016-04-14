var Player = (function () {
    /**
     *  The constructed needs as parameters:
     *      X position of the object,
     *      Y position of the object,
     *      WIDTH of the object,
     *      HEIGHT of the object,
     *      RUNNINGSPEED used for the movement of the player
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param runningSpeed
     * @param gravityWeight
     * @constructor
     */
    function Player(x, y, width, height, runningSpeed, gravityWeight) {
        // Coordinate Values
        //
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Values for object updates
        // such as movement and gravity
        //
        this.runningSpeed = runningSpeed;
        this.gravityWeight = gravityWeight;

        // ENUM-like navigation to use throughout the program
        // to make a consistent way to refer to directions
        //
        this.navigation = {
            'up'    : 3,
            'down'  : 4,
            'left'  : 1,
            'right' : 2
        };

        // The current direction of the player object,
        // used in the movement class to determine if going
        // left or right on the screen and update
        //
        this.direction = 0;

        // Player object states, used for jumping, movement
        // and sprite animations
        //
        this.states = {
            'dead'      : 0,    // 0
            'idle'      : 1,    // 1
            'jump'      : 2,    // 2
            'run'       : 3,    // 3
            'slide'     : 4,    // 4 not used
            'falling'   : 5     // 5
        };

        // start off in idle state
        //
        this.currentState = 1;
    }

    /**
     * Returns the horizontal center of this object's rectangle.
     * This is referred to as horizontal center, because
     * it is calculated by using the horizontal (X) position of the
     * object and the width.
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    Player.prototype.getHorizontalCenter = function () {

        return (this.width + this.x) / 2;
    };

    /**
     * Returns the vertical center of this object's rectangle.
     * This is referred to as vertical center, because
     * it is calculated by using the vertical (Y) position of the
     * object and the height
     *
     * @returns {number} the center of the object, calculated from it's vertical (Y) position
     */
    Player.prototype.getVerticalCenter = function () {
        return (this.height + this.y) / 2;
    };

    Player.prototype.toString = function () {
        return "x->" + this.x + " y->" + this.y + " width->" + this.width + " height->" + this.height;
    };

    /**
     * Method available in every object class,
     * it uses the renderManager to render itself
     * on screen
     * @param canvasContext context of th
     */
    Player.prototype.render = function (canvasContext) {
        //renderManager.renderImage(canvasContext, this);
        renderManager.renderRectangle(canvasContext, this);
    };

    return Player;
})();