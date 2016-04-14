/**
 * Created by dimta on 13-Apr-16.
 */

var Platform = (function () {

    /**
     * TODO
     * @param x
     * @param y
     * @param width
     * @param height
     * @param deflateSpeed
     * @param fillColour
     * @constructor
     */
    function Platform(x, y, width, height, deflateSpeed, fillColour) {
        // x is the right-most point on screen
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.deflateSpeed = deflateSpeed;
        this.fillColour = fillColour;
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
     * Returns the horizontal center of this object's rectangle.
     * This is referred to as horizontal center, because
     * it is calculated by using the horizontal (X) position of the
     * object and the width.
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    Platform.prototype.getHorizontalCenter = function () {
        return (this.width + this.x) / 2;
    };

    /**
     * Returns the vertical center of this object's rectangle.
     * This is referred to as vertical center, because
     * it is calculated by using the vertical (Y) position of the
     * object and the height
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    Platform.prototype.getVerticalCenter = function () {
        return (this.height + this.y) / 2;
    };

    Platform.prototype.toString = function () {
        return "x->" + this.x + " y->" + this.y + " width->" + this.width + " height->" + this.height;
    };

    Platform.prototype.render = function (canvasContext) {
        renderManager.renderRectangle(canvasContext, this);
    };

    return Platform;
})();
