/**
 * Created by dimta on 13-Apr-16.
 */
/**
 * This class will receive all game objects and then render them on screen
 * @type {Function}
 */
var renderManager = (function () {
    
    this.renderImage = function (canvasContext, rectangleObject) {
        var currentFrame = 0; // might have to be global or move to animation?

        switch (rectangleObject.currentState) {
            case 'idle':
                var spriteImage = assetLoader.hero.idle[currentFrame];
        }

        canvasContext.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, rectangleObject.x, rectangleObject.y, rectangleObject.width, rectangleObject.height);
    };

    this.renderRectangle = function (canvasContext, rectangleObject) {
        canvasContext.fillStyle = rectangleObject.fillColour;
        canvasContext.fillRect(rectangleObject.x, rectangleObject.y, rectangleObject.width, rectangleObject.height);
    };

    this.renderCircle = function (canvasContext, circleObject) {
        canvasContext.beginPath();
        canvasContext.arc(circleObject.x, circleObject.y, circleObject.radius, 0, Math.PI * 2, true);
        canvasContext.closePath();
        canvasContext.fillStyle = "rgb(0,0,0)";
        canvasContext.fill();
    };

    return this;
})();