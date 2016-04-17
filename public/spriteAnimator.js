/**
 * Created by dimta on 17-Apr-16.
 */

/**
 * This class is used to animate the sprites for the game
 */
var spriteAnimator = (function () {

    // Frame counter for the sprite image change
    //
    var currentFrame = 0;

    // As some of the sprite images for the different
    // states have different width
    // this adjusts so the image will look appropriate
    // on screen. This does not change the collision hit box of the player
    //
    var spriteImageWidthChange = 0;
    var spriteImageHeightChange = 0;

    // Animation speed counter,
    // higher values will slow down the speed
    // at which the sprites change
    //
    var ANIMATION_SPEED = 50;

    // Animation divisor calculates how often
    // the sprites have to change depending on
    // the animation speed. It is divided by 9 to
    // loop through <StateName>___000 to <StateName>___009
    //
    var ANIMATION_DIVISOR = ANIMATION_SPEED / 9;

    // Store the last direction the player was in
    // to show appropriate sprite facing left or right
    // even when player is not moving anymore
    //
    var lastDirection = 1;

    this.getPlayerSprite = function (playerObject) {
        // frame counter to track when we have to switch sprite images
        //
        currentFrame++;

        // variable storing the sprite image, then used for showing it on screen
        //
        var spriteImage;

        // store the direction only if it's different from 0 (the player hasnt moved in the current frame yet)
        // or if the direction is different that our current one
        //
        if (playerObject.direction != 0 && playerObject.direction != lastDirection) {
            lastDirection = playerObject.direction;
        }

        // select different animation depending on object state
        //
        switch (playerObject.currentState) {

            // case the player is idle
            //
            case player.states.idle:

                // If the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___000 to <StateName>___009
                //
                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                }

                // If the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___0010 to <StateName>___0019
                // that is the reason for the +10 at the end
                //
                else if (lastDirection == player.navigation.left) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / ANIMATION_DIVISOR) + 10];
                }

                spriteImageWidthChange = 0;
                spriteImageHeightChange = 0;

                break;

            // case the player is running
            case player.states.run:

                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                } else if (lastDirection == player.navigation.left) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / ANIMATION_DIVISOR) + 10];
                }

                spriteImageWidthChange = 20;
                spriteImageHeightChange = 0;


                break;

            case player.states.falling:

            // FALL-THROUGH on purpose
            // they use the same sprite animation

            case player.states.jump:

                if (lastDirection == player.navigation.right) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                } else if (lastDirection == player.navigation.left) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / ANIMATION_DIVISOR) + 10];

                }

                spriteImageWidthChange = 25;
                spriteImageHeightChange = 5;
                break;

            case player.states.dead:

                spriteImage = assetLoader.hero.dead[Math.floor(currentFrame / ANIMATION_DIVISOR)];

                spriteImageWidthChange = 20;

                break;

        }

        // reset frame counter
        //
        if (currentFrame > ANIMATION_SPEED) {
            currentFrame = 0;
        }

        return {
            'image': spriteImage,
            'widthChange': spriteImageWidthChange,
            'heightChange': spriteImageHeightChange
        };
    };

    return this;
})();