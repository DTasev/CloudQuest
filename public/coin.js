/**
 * The coin object class
 *
 * @author Dimitar Tasev
 */
var Coin = (function () {

    /**
     * The
     * @param x
     * @param y
     * @param difficulty
     */
    function Coin(x, y, difficulty){
        this.x      = x;
        this.y      = y;
        this.width  = 35;
        this.height = 35;

        this.difficulty = difficulty;

        this.fillColour = 'rgb(0,0,255)';

        this.coinDifficulties = {
            'easy'      : 1,
            'medium'    : 2,
            'hard'      : 3
        }

    }

    /**
     * Returns the horizontal center of this object's rectangle.
     * This is referred to as horizontal center, because
     * it is calculated by using the horizontal (X) position of the
     * object and the width.
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    Coin.prototype.getHorizontalCenter = function () {

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
    Coin.prototype.getVerticalCenter = function () {
        return (this.height + this.y) / 2;
    };


    /**
     * Renders the coin object on screen
     * Uses the sprite animator class to get the appropriate sprite image
     *
     * @param canvasContext
     */
    Coin.prototype.render = function (canvasContext) {
        //renderManager.renderRectangle(canvasContext, this);
        renderManager.renderCoin(canvasContext, this);
    };

    return Coin;

})();