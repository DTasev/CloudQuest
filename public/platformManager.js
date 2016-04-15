/**
 * Created by dimta on 15-Apr-16.
 */

var platformManager = (function () {
    this.generatePlatforms = function (gameObjects, renderArray) {
        // TODO tomorrow (15/04/2016)
        // generate number of new platforms (might decrease with difficulty increase
        // platform x, y, width, height random, but capped
        // platform deflateSpeed random
        // color?, maybe give different colours for different speed
        // x+width cannot be > canvas.width
        // y+height cannot be > canvas.height
        // after generating platform -> add to gameObjects, add to renderArray


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

                platform.y += platform.deflateSpeed/2;
                platform.height -= platform.deflateSpeed/2;

                break;

            // Deflates the platform from the bottom
            // by decreasing the height.
            //
            case platform.availableDeflateTypes.bottom:

                platform.height -= platform.deflateSpeed/2;

                break;

            // Deflates the platform from the top and bottom
            // by moving the Y point and decreasing
            // the height twice as faster otherwise
            // the platform just moves down.
            //
            case platform.availableDeflateTypes.vertical:

                platform.y += platform.deflateSpeed/2;
                platform.height -= platform.deflateSpeed;

                break;
        }
    };
    return this;
})();