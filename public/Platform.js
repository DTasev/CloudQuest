/**
 * Created by dimta on 13-Apr-16.
 */

var Platform = (function () {
    function Platform(x, y, radius, deflateSpeed, gravityWeight) {
        // x is the right-most point on screen
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.deflateSpeed = deflateSpeed;
        this.gravityWeight = gravityWeight;
    }

    /**
     * Moves the player vertically the specified distance
     * @param distance
     */
    Platform.prototype.moveVer = function (distance) {
        this.y += distance;
    };
    /**
     * Moves the player horizontally the specified distance
     * @param distance
     */
    Platform.prototype.moveHor = function (distance) {
        this.x += distance;
    };

    /**
     * Returns the center of the player's rectangle.
     * @returns {number}
     */
    Platform.prototype.getCenter = function () {
        return this.x - this.radius;
    };

    Platform.prototype.toString = function () {
        return "x->" + this.x + " y->" + this.y + " width->" + this.width + " height->" + this.height;
    };

    Platform.prototype.render = function (ctx) {
        renderManager.renderCircle(ctx, this);
    };

    return Platform;
})();