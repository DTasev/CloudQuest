/**
 * This class is used to count the frames and
 * animate the sprites for the game
 *
 * @author Dimitar Tasev
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

    // The animation timer calculates how often
    // the sprites have to change depending on
    // the animation speed. It is divided by 9 to
    // loop through <StateName>___000 to <StateName>___009
    //
    var HERO_ANIMATION_TIMER = ANIMATION_SPEED / 9;

    // Store the last direction the player was in
    // to show appropriate sprite facing left or right
    // even when player is not moving anymore
    //
    var lastDirection = 1;


    /**
     * Controls the player's sprite animation
     *
     * @param playerObject
     * @returns {{image: *, widthChange: number, heightChange: number}}
     */
    this.getPlayerSprite = function (playerObject) {

        // class wide frame counter to track when we have to switch sprite images
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
            case playerObject.states.idle:

                // If the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___000 to <StateName>___009
                //
                if (lastDirection == playerObject.navigation.right) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / HERO_ANIMATION_TIMER)];

                }

                // If the direction is right, load the sprites facing right
                // which in the storage are from <StateName>___0010 to <StateName>___0019
                // that is the reason for the +10 at the end
                //
                else if (lastDirection == playerObject.navigation.left) {

                    spriteImage = assetLoader.hero.idle[Math.floor(currentFrame / HERO_ANIMATION_TIMER) + 10];
                }

                // Image padding because the sprite image has
                // different width than the hit box
                //
                spriteImageWidthChange = 0;
                spriteImageHeightChange = 0;

                break;

            // case the player is running
            case playerObject.states.run:

                if (lastDirection == playerObject.navigation.right) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / HERO_ANIMATION_TIMER)];

                } else if (lastDirection == playerObject.navigation.left) {

                    spriteImage = assetLoader.hero.run[Math.floor(currentFrame / HERO_ANIMATION_TIMER) + 10];
                }

                // Image padding because the sprite image has
                // different width than the hit box
                //
                spriteImageWidthChange = 20;
                spriteImageHeightChange = 0;


                break;

            case playerObject.states.falling:

            // FALL-THROUGH on purpose
            // they use the same sprite animation

            case playerObject.states.jump:

                if (lastDirection == playerObject.navigation.right) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / HERO_ANIMATION_TIMER)];

                } else if (lastDirection == playerObject.navigation.left) {

                    spriteImage = assetLoader.hero.jump[Math.floor(currentFrame / HERO_ANIMATION_TIMER) + 10];

                }

                // Image padding because the sprite image has
                // different width than the hit box
                //
                spriteImageWidthChange = 25;
                spriteImageHeightChange = 5;

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


    // Calculates how often the sprites for the coin have to change
    // this is different as the coin has less sprite images
    //
    var COIN_ANIMATION_TIMER = ANIMATION_SPEED / 5;


    /**
     * Controls the coin's sprite animation
     *
     * @returns {{image: *}}
     */
    this.getCoinSprite = function () {

        var spriteImage;

        spriteImage = assetLoader.coin[Math.floor(currentFrame / COIN_ANIMATION_TIMER)];

        return {'image': spriteImage};

    };


    /**
     * Returns the platform's sprites
     * @param platformObject
     * @returns {{image: *}}
     */
    this.getPlatformSprite = function (platformObject) {
        var spriteImage;

        switch (platformObject.deflateType) {

            case platformObject.availableDeflateTypes.left:

                spriteImage = assetLoader.platforms[0];

                break;

            case platformObject.availableDeflateTypes.right:

                spriteImage = assetLoader.platforms[0];

                break;

            case platformObject.availableDeflateTypes.horizontal:

                spriteImage = assetLoader.platforms[0];

                break;

            case platformObject.availableDeflateTypes.top:

                spriteImage = assetLoader.platforms[1];

                break;

            case platformObject.availableDeflateTypes.bottom:

                spriteImage = assetLoader.platforms[1];

                break;

            case platformObject.availableDeflateTypes.vertical:

                spriteImage = assetLoader.platforms[1];

                break;

        }

        return {'image': spriteImage};
    };


    return this;
})();