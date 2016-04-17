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

    var ANIMATION_SPEED = 60;
    var ANIMATION_DIVISOR = ANIMATION_SPEED / 9;

    // Store the last direction the player was in
    // to show appropriate sprite facing left or right
    // even when player is not moving anymore
    //
    var lastDirection = 1;

    this.renderImage = function (canvasContext, playerObject) {

        // frame counter to track when we have to switch sprite images
        //
        currentFrame++;

        // variable storing the sprite image, then used for showing it on screen
        //
        var spriteImage;

        // store the direction only if it's different from 0 (the player hasnt moved in the current frame yet)
        // or if the direction is different that our current one
        //
        if(playerObject.direction != 0 && playerObject.direction != lastDirection){
            lastDirection = playerObject.direction;
        }

        // render different animation depending on object state
        //
        switch (playerObject.currentState) {

            // case the player is idle
            //
            case player.states.idle:

                //if the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___000 to <StateName>___009
                //
                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                }

                //if the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___0010 to <StateName>___0019
                // that is the reason for the +10 at the end
                //
                else if (lastDirection == player.navigation.left) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / ANIMATION_DIVISOR)+10];
                }

                animationWidthChange = 0;
                animationHeightChange = 0;

                break;

            case player.states.run:

                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                } else if (lastDirection == player.navigation.left) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR)+10];
                }

                animationWidthChange = 20;
                animationHeightChange = 0;


                break;

            case player.states.falling:

            // FALL-THROUGH on purpose
            // they use the same sprite animation

            case player.states.jump:

                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                } else if (lastDirection == player.navigation.left) {

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

        canvasContext.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, playerObject.x, playerObject.y, playerObject.width + animationWidthChange, playerObject.height + animationHeightChange);
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