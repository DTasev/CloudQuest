var Player = (function () {
    /**
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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.runningSpeed = runningSpeed;
        this.gravityWeight = gravityWeight;
        this.navigation = {
            'up'    : 3,
            'down'  : 4,
            'left'  : 1,
            'right' : 2
        };
        this.states = {
            'dead'      : 0,   // 0
            'idle'      : 1,   // 1
            'jump'      : 2,   // 2
            'run'       : 3,    // 3
            'slide'     : 4,   // 4 not used
            'falling'   : 5
        };
        this.currentState = 1;
        this.direction = 0;
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
        return (this.width + this.x + this.x) / 2;
    };

    /**
     * Returns the vertical center of this object's rectangle.
     * This is referred to as vertical center, because
     * it is calculated by using the vertical (Y) position of the
     * object and the height
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    Player.prototype.getVerticalCenter = function () {
        return (this.height + this.y + this.y) / 2;
    };

    Player.prototype.toString = function () {
        return "x->" + this.x + " y->" + this.y + " width->" + this.width + " height->" + this.height;
    };

    Player.prototype.render = function (ctx) {
        //renderManager.renderImage(ctx, this);
        renderManager.renderRectangle(ctx, this);
    };

    return Player;
})();