/**
 * Created by dimta on 15-Apr-16.
 */
var platformManager = (function () {

    // The maximum deflation speed
    // for both horizontal and vertical
    // Going below this makes the game
    // very hard and at times unplayable
    //
    var MAX_HORIZONTAL_SPEED = 1.5;
    var MAX_VERTICAL_SPEED = 0.6;

    // Difficulty modifier for the game
    // This should be reduced to make the game harder
    // as it will increase the deflation speed of the platforms
    //
    this.difficultyModifier = 1.0;


    this.MAXIMUM_PLATFORMS = 10;
    var currentPlatforms = 0;

    this.removePlatform = function (positionInGameObjects, gameObjects) {
        if (collisionDetector.checkLowerBounds(gameObjects[positionInGameObjects]) || ((gameObjects[positionInGameObjects].width < 0) || (gameObjects[positionInGameObjects].height < 0))) {

            gameObjects.splice(positionInGameObjects, 1);

            currentPlatforms -= 1;

        }

    };

    /**
     *  This function is used to generate new platforms for the game.
     *
     *  It generates a random number of platforms.
     *
     *  For the platform the X, Y, width, height, deflate type and speed, and colour
     *  are generated randomly following some restrictions.
     *
     * @param gameObjects
     */
    this.generatePlatforms = function (gameObjects) {

        if (currentPlatforms < this.MAXIMUM_PLATFORMS) {

            // Random number of new platforms
            //
            var numberOfPlatforms = Math.floor((Math.random() * 4) + 1);

            for (var i = 0; i < numberOfPlatforms; i++) {

                // Generate the platform's location (X,Y) and parameters (width, height)
                //
                var width = Math.floor((Math.random() * canvas.width / 3) + 30);
                var height = Math.floor((Math.random() * 30) + 10);
                var x = Math.floor((Math.random() * canvas.width - width) + 1);
                var y = Math.floor((Math.random() * canvas.height - height - 50) + 1);


                // Generate the platform's deflate type randomly.
                // As each platform has 6 different types, the number
                // can be between 1 and 6
                //
                var deflateType = Math.floor((Math.random() * 6) + 1);


                // Generate the deflating speed for the platform randomly
                //
                // Affected by a difficulty modifier, which is controlled by the difficultyManager
                //
                // Starting deflate speed for horizontal and vertical between 0.1 and 0.4
                // if vertical -> if height < 20, speed in half
                //
                var deflateSpeed = (Math.random() * 0.4 + 0.1 ) * difficultyModifier;

                var colour;


                // 1, 2 and 3 are the horizontal deflation types.
                // They can be a little bit faster than the vertical ones.
                //
                if (deflateType === 1 || deflateType === 2 || deflateType === 3) {

                    // Cap the deflate speed, otherwise it may be
                    // unfair because the platform will disappear too fast
                    //
                    if (deflateSpeed > MAX_HORIZONTAL_SPEED) {
                        deflateSpeed = MAX_HORIZONTAL_SPEED;
                    }

                    // 4, 5 and 6 are the vertical deflation types
                    // They need to be slower to give the player the opportunity
                    // to jump on them
                    //
                } else if (deflateType === 4 || deflateType === 5 || deflateType === 6) {

                    // Cap the deflate speed, otherwise it may be
                    // unfair because the platform will disappear too fast
                    //
                    if (deflateSpeed > MAX_VERTICAL_SPEED) {
                        deflateSpeed = MAX_VERTICAL_SPEED;
                    }

                    // For smaller vertical platforms
                    // reduce deflation speed
                    //
                    if (height < 20) {
                        deflateSpeed = deflateSpeed / 2;
                    }

                }

                // Create the new platform from the
                // variables generated above.
                // This is done separately to reduce clustering
                //
                var newPlatform = new Platform(x, y, width, height, deflateSpeed, deflateType);


                // Add platform to game objects array
                // so that it can be updated and rendered
                //
                gameObjects.push(newPlatform);


                // Increment platform count
                //
                currentPlatforms += 1;
            }
        }

    };

    /**
     * Handles deflation for the platform,
     * dependent on deflationType.
     *
     * There are multiple deflation types, defined
     * in the platform.js file as availableDeflateTypes.
     *
     * @param canvas The HTML5 Canvas object
     * @param gameObjects Array containing all of the game objects for updating and rendering
     */
    this.handleDeflation = function (canvas, gameObjects) {

        // Check if there are any objects to handle at all
        //
        if (gameObjects.length > 0) {

            // Loop through all platforms inside the gameObjects
            //
            // The loop starts from 1 to avoid the player object
            //
            for (var i = 1; i < gameObjects.length; i++) {

                var platform = gameObjects[i];
                // try-catch if the platform that's checked is not an actual platform
                // it will not have deflate type, and the loop will skip onto the
                // next member of the array
                //
                try {
                    switch (platform.deflateType) {

                        // Deflates the platform from the left
                        // by moving the X point and also reducing
                        // the width, otherwise the platform would
                        // just move to the right.
                        //
                        case platform.availableDeflateTypes.left:

                            platform.x += platform.deflateSpeed;
                            platform.width -= platform.deflateSpeed;

                            break;

                        // Deflates the platform from the right
                        // by just reducing the width.
                        //
                        case platform.availableDeflateTypes.right:

                            platform.width -= platform.deflateSpeed;

                            break;

                        // Deflates the platform horizontally
                        // by moving the X point and reducing the width.
                        //
                        // The deflateSpeed for the width has to be
                        // multiplied by two, otherwise the platform
                        // will just move to the right.
                        //
                        case platform.availableDeflateTypes.horizontal:

                            platform.x += platform.deflateSpeed;
                            platform.width -= platform.deflateSpeed * 2;

                            break;

                        // The deflateSpeed is reduced by half
                        // because the platforms are wider that higher
                        // and this makes them deflate nearly equally fast.

                        // Deflates the platform from the top
                        // by moving the Y point and also
                        // reducing the height, otherwise the platform
                        // would just move down.
                        //
                        case platform.availableDeflateTypes.top:

                            platform.y += platform.deflateSpeed / 2;
                            platform.height -= platform.deflateSpeed / 2;

                            break;

                        // Deflates the platform from the bottom
                        // by decreasing the height.
                        //
                        case platform.availableDeflateTypes.bottom:

                            platform.height -= platform.deflateSpeed / 2;

                            break;

                        // Deflates the platform from the top and bottom
                        // by moving the Y point and decreasing
                        // the height twice as faster otherwise
                        // the platform just moves down.
                        //
                        case platform.availableDeflateTypes.vertical:

                            platform.y += platform.deflateSpeed / 2;
                            platform.height -= platform.deflateSpeed;

                            break;
                    }
                } catch (e) {

                    // empty catch block, don't have anything to do with the exception

                }

            }
        }
    };

    /**
     * Resets the platform's generation counter
     *
     */
    this.resetPlatformGeneration = function () {

        currentPlatforms = 0;
    };

    return this;
})
();