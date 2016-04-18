/**
 * Created by dimta on 18-Apr-16.
 */

var Coin = (function () {

    /**
     * The
     * @param x
     * @param y
     * @constructor
     */
    function Coin(x, y){
        this.x      = x;
        this.y      = y;
        this.width  = 50;
        this.height = 50;
        this.fillColour = 'rgb(0,0,255)';
    }

    Coin.prototype.render = function (canvasContext) {
        renderManager.renderRectangle(canvasContext, this);
        //renderManager.renderCoin(canvasContext, this);
    };

    return Coin;

})();