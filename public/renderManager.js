/**
 * Created by dimta on 13-Apr-16.
 */
/**
 * This class will receive all game objects and then render them on screen
 * @type {Function}
 */
var renderManager = (function () {
    var currentFrame = 0; // might have to be global or move to animation?
    var animationWidthChange = 0;
    var animationHeightChange = 0;

    var ANIMATION_SPEED = 30;

    var ANIMATION_DIVISOR = ANIMATION_SPEED / 9;

    this.renderImage = function (canvasContext, rectangleObject) {
        currentFrame++;


        /*
         count frames
         on every 10? frames change player sprite,
         or change it on a timer
         */

        var spriteImage;

        switch (rectangleObject.currentState) {
            case player.states.idle:

                spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                animationWidthChange = 0;
                animationHeightChange = 0;

                break;

            case player.states.run:

                if (rectangleObject.direction == 2) {
                    console.log('Going right or idle -> ' + Math.floor(currentFrame / ANIMATION_DIVISOR));

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR)];
                } else if (rectangleObject.direction == 1) {
                    console.log('Going left -> ' + Math.floor(currentFrame / ANIMATION_DIVISOR));

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR)+10];
                }

                animationWidthChange = 20;
                animationHeightChange = 0;


                break;

            case player.states.falling:

            // FALL-THROUGH on purpose
            // they use the same sprite animation

            case player.states.jump:

                if (rectangleObject.direction == 2) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                } else if (rectangleObject.direction == 1) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / ANIMATION_DIVISOR)+10];

                }

                animationWidthChange = 25;
                animationHeightChange = 5;
                break;

            case player.states.dead:

                spriteImage = assetLoader.hero.dead[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                animationWidthChange = 20;

                break;

        }

        if (currentFrame > ANIMATION_SPEED) {
            currentFrame = 0;
        }

        canvasContext.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, rectangleObject.x, rectangleObject.y, rectangleObject.width + animationWidthChange, rectangleObject.height + animationHeightChange);
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