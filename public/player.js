var Player = (function () {
    function Player(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
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

    Player.prototype.gravity = function () {
        this.y += 1;
    };

    Player.prototype.render = function (ctx) {
        var i = assetLoader.hero.dead[0];

        ctx.drawImage(i, 0, 0, i.width, i.height, this.x, this.y, this.width, this.height);
    };

    return Player;
})();