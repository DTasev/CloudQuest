/**
 * Created by dimta on 15-Apr-16.
 */
var platformManager = (function () {
        var MAX_HORIZONTAL_SPEED = 1.5;
        var MAX_VERTICAL_SPEED = 0.6;
        this.difficultyModifier = 1.0;
        this.MAXIMUM_PLATFORMS = 7;

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
            /*
             Platform x, y, width, height random, but capped:
             - Width between 30 and canvas.width / 3
             - Height between 10 and and 30
             - X between 0  and canvas.width - platform.width
             - Y between 0 and canvas.height - basePlatform.height (50) - platform.height


             Platform deflateType
             - Random between one of the 6 deflation types

             Platform deflateSpeed dependent on width, height and deflateType
             - Use dampener for deflateSpeed generation
             - the smaller the width the slower the deflate speed
             - same for the height
             - deflate types horizontal and vertical need slower deflate speed

             Platform color
             - give different colours for different speed
             - categorise deflateSpeed and give different colours

             On completion generating platform -> add to gameObjects, add to renderArray

             */


            //debugger;
            if (gameObjects.length < MAXIMUM_PLATFORMS) {

                var numberOfPlatforms = Math.floor((Math.random() * 4) + 1);

                /**
                 * FIXME generation can sometimes be outside of the canvas
                 *
                 */
                for (var i = 0; i < numberOfPlatforms; i++) {

                    // Math.floor((Math.random() * 100) + 1);
                    // random number between 1 and 100

                    //debugger;

                    // TODO check if the platoform is colliding with any other platform
                    //
                    var width = Math.floor((Math.random() * canvas.width / 3) + 30);
                    var height = Math.floor((Math.random() * 30) + 10);
                    var x = Math.floor((Math.random() * canvas.width - width) + 1);
                    var y = Math.floor((Math.random() * canvas.height - height) - 50);

                    var deflateType = Math.floor((Math.random() * 6) + 1);

                    // Starting deflate speed for horizontal and vertical between 0.1 and 0.4
                    // if vertical -> if height < 20, speed in half
                    //
                    var deflateSpeed = (Math.random() * 0.4 + 0.1 ) * difficultyModifier;

                    var colour;

                    if (deflateType === 1 || deflateType === 2 || deflateType === 3) {

                        if (deflateSpeed > MAX_HORIZONTAL_SPEED) {
                            deflateSpeed = MAX_HORIZONTAL_SPEED;
                        }

                        // Determining the colour dependent on the deflateSpeed
                        //
                        // Math.floor is necessary because RGB wants whole numbers
                        //
                        colour = 'rgb(' + Math.floor(30 * (deflateSpeed * 10)) + ',0,0)';

                    } else if (deflateType === 4 || deflateType === 5 || deflateType === 6) {

                        if (deflateSpeed > MAX_VERTICAL_SPEED) {
                            deflateSpeed = MAX_VERTICAL_SPEED;
                        }

                        if (height < 20) {
                            deflateSpeed = deflateSpeed / 2;
                        }

                        // Determining the colour dependent on the deflateSpeed
                        //
                        // Math.floor is necessary because RGB wants whole numbers
                        //
                        colour = 'rgb(0,' + Math.floor(30 * (deflateSpeed * 10)) + ',0)';
                    }

                    //console.log('DeflateSpeed: ' + deflateSpeed + '\nDeflateType: ' + deflateType +'\nColour: ' + colour);

                    // Create the new platform from the
                    // variables generated above.
                    // This is done separately to reduce clustering
                    //
                    var newPlatform = new Platform(x, y, width, height, deflateSpeed, deflateType, colour);

                    gameObjects.push(newPlatform);
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

                    // Check if the current platform's width or height are equal or below 0
                    // if they are then they must be deleted
                    //
                    if (platform.width <= 0
                        || platform.height <= 0
                        || platform.x + platform.width > canvas.width
                        || platform.y + platform.height > canvas.height
                    ) {

                        // Remove from both game objects arrays
                        // and the rendering array
                        //
                        gameObjects.splice(i, 1);

                    } else {

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
                    }
                }
            }
        }
        ;
        return this;
    })();