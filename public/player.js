var Player = (function () {
    function Player(x, y, width, height, runningSpeed, gravityWeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.runningSpeed = runningSpeed;
        this.gravityWeight = gravityWeight;
    }

    /**
     * Moves the player vertically the specified distance
     * @param distance
     */
    Player.prototype.moveVer = function (distance) {
        this.y += distance;
    };
    /**
     * Moves the player horizontally the specified distance
     * @param distance
     */
    Player.prototype.moveHor = function (distance) {
        this.x += distance;
    };

    /**
     * Returns the center of the player's rectangle.
     * @returns {number}
     */
    Player.prototype.getHorizontalCenter = function () {
        return (this.width + this.x + this.x) / 2;
    };

    Player.prototype.getVerticalCenter = function () {
        return (this.height + this.y + this.y) / 2;
    };

    Player.prototype.toString = function () {
        return "x->" + this.x + " y->" + this.y + " width->" + this.width + " height->" + this.height;
    };

    Player.prototype.render = function (ctx) {
        renderManager.renderImage(ctx, this);
    };

    return Player;
})();