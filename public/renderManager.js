/**
 * Created by dimta on 13-Apr-16.
 */
/**
 * This class will receive all game objects and then render them on screen
 * @type {Function}
 */
var renderManager = (function () {

    this.renderImage = function (ctx, renderObject) {
        var i = assetLoader.hero.dead[0];

        ctx.drawImage(i, 0, 0, i.width, i.height, renderObject.x, renderObject.y, renderObject.width, renderObject.height);
    };
    this.renderCircle = function (ctx, renderObject) {
        ctx.beginPath();
        ctx.arc(renderObject.x, renderObject.y, renderObject.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fill();
    };
    return this;
})();