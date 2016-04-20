/**
 * This class receives game objects and renders them on screen.
 *
 * It uses an IIFE expression to hide the code and just provides the
 * renderManager as a global variable.
 *
 */
var renderManager = (function () {


    /**
     * Renders the platform sprite on screen.
     *
     * The image sprite is read using the spriteAnimator class
     * and is then drawn on screen using the drawImage method
     * of the canvas' context
     * @param canvasContext
     * @param platformObject
     */
    this.renderPlatform = function (canvasContext, platformObject) {

        var sprite = spriteAnimator.getPlatformSprite(platformObject);

        canvasContext.drawImage(
            sprite.image,
            0, 0,
            sprite.image.width, sprite.image.height,
            platformObject.x, platformObject.y,
            platformObject.width, platformObject.height
        );
    };

    /**
     * Renders the coin sprite on screen.
     * The image sprite is read using the spriteAnimator class
     * and is then drawn on screen using the drawImage method
     * of the canvas' context
     *
     * @param canvasContext The canvas that the object will be drawn on.
     * @param coinObject The object that will be drawn on the canvas.
     */
    this.renderCoin = function (canvasContext, coinObject) {

        var sprite = spriteAnimator.getCoinSprite(coinObject);

        canvasContext.drawImage(
            sprite.image,
            0, 0,
            sprite.image.width, sprite.image.height,
            coinObject.x, coinObject.y,
            coinObject.width, coinObject.height
        );

    };

    /**
     * Renders the player sprite on the screen.
     * The image sprite is read using the spriteAnimator class
     * and is then drawn on screen using the drawImage method
     * of the canvas' context
     *
     * @param canvasContext The canvas that the object will be drawn on.
     * @param playerObject The object that will be drawn on the canvas.
     */
    this.renderPlayer = function (canvasContext, playerObject) {

        var sprite = spriteAnimator.getPlayerSprite(playerObject);

        canvasContext.drawImage(
            sprite.image,
            0, 0,
            sprite.image.width, sprite.image.height,
            playerObject.x, playerObject.y,
            playerObject.width + sprite.widthChange, playerObject.height + sprite.heightChange
        );

    };

    /**
     * Renders a rectangle on the screen.
     * The colour has to be specified in the object that's
     * going to be rendered in the attribute fillColour.
     *
     * It uses the canvas' method fillRect
     *
     * @param canvasContext The canvas that the object will be drawn on.
     * @param rectangleObject The object that will be drawn on the canvas.
     */
    this.renderRectangle = function (canvasContext, rectangleObject) {

        canvasContext.fillStyle = rectangleObject.fillColour;
        canvasContext.fillRect(rectangleObject.x, rectangleObject.y, rectangleObject.width, rectangleObject.height);

    };

    /**
     * Render a circle on the screen. It uses the canvas' path to draw a
     * circle on the screen and then draws it using .fill()
     *
     * @param canvasContext The canvas that the object will be drawn on.
     * @param circleObject The object that will be drawn on the canvas.
     */
    this.renderCircle = function (canvasContext, circleObject) {
        canvasContext.beginPath();
        canvasContext.arc(circleObject.x, circleObject.y, circleObject.radius, 0, Math.PI * 2, true);
        canvasContext.closePath();
        canvasContext.fillStyle = "rgb(0,0,0)";
        canvasContext.fill();
    };

    return this;
})();