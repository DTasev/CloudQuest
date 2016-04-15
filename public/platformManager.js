/**
 * Created by dimta on 15-Apr-16.
 */

var platformManager = (function () {

    this.generatePlatforms = function (gameObjects, renderArray) {
        // TODO tomorrow (15/04/2016)
        // generate number of new platforms (might decrease with difficulty increase
        /*
         Platform x, y, width, height random, but capped:
         - Width between 20 and canvas.width / 2
         - Height between 40 and and 100
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
        if (gameObjects.length < 7) {

            var numberOfPlatforms = Math.floor((Math.random() * 2) + 1);


            /**
             * TODO stable deflate speed, dependant on deflate type and width/height for horizontal and vertical
             *
             * TODO generation can sometimes be outside of the canvas
             *
             */
            for (var i = 0; i < numberOfPlatforms; i++) {

                // Math.floor((Math.random() * 100) + 1);
                // random number between 1 and 100

                //debugger;

                var width = Math.floor((Math.random() * canvas.width / 2) + 20);
                var height = Math.floor((Math.random() * 30) + 10);
                var x = Math.floor((Math.random() * canvas.width - width));
                var y = Math.floor((Math.random() * canvas.height - 50 - height));

                var deflateType;
                try{
                   deflateType = Math.floor((Math.random() * 6) + 1);
               }catch (e) {
                   debugger;
                    console.log(e);
               }

                console.log((deflateType));

                // Starting deflate speed for horizontal = 0.3
                // Starting deflate speed for vertical = 0.3 if height > 20,
                //                                           if height < 20, speed = 0.15
                // Max for any vertical 0.5
                // max for any horizontal 1
                var deflateSpeed = 0.75;

                //var deflateSpeed = Math.random()+0.03;

                var R = Math.floor((Math.random() * 256));
                var G = Math.floor((Math.random() * 256));
                var B = Math.floor((Math.random() * 256));
                var color = 'rgb(' + R + ',' + G +','+B+')';

                var newPlatform = new Platform(x, y, width, height, deflateSpeed, deflateType, color);
                gameObjects.push(newPlatform);
                renderArray.push(newPlatform);
            }
        }

    };

    /**
     * Handles deflation for the platform,
     * dependant on deflationType.
     *
     * There are multiple deflation types, defined
     * in the platform.js file as availableDeflateTypes.
     *
     * @param platform Platform to be deflated
     */
    this.handleDeflation = function (platform) {
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
    };
    return this;
})();