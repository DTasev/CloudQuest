var GameObject = (function () {

    /**
     * @param x X position of the object
     * @param y Y position of the object
     * @param width Width of the object
     * @param height Height of the object
     * @constructor
     */
    function GameObject(x, y, width, height){
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;
        
        // default black colour
        this.fillColour = 'rgb(0,0,0)';
    }

    /**
     * Returns the horizontal center of this object's rectangle.
     * This is referred to as horizontal center, because
     * it is calculated by using the horizontal (X) position of the
     * object and the width.
     *
     * @returns {number} the center of the object, calculated from it's horizontal (X) position
     */
    GameObject.prototype.getHorizontalCenter = function () {

        return (this.width + this.x) / 2;
    };

    /**
     * Returns the vertical center of this object's rectangle.
     * This is referred to as vertical center, because
     * it is calculated by using the vertical (Y) position of the
     * object and the height
     *
     * @returns {number} the center of the object, calculated from it's vertical (Y) position
     */
    GameObject.prototype.getVerticalCenter = function () {
        return (this.height + this.y) / 2;
    };


    GameObject.prototype.update = function () {
        alert('GameObject.update not implemented');
    };

    GameObject.prototype.render = function () {
        alert('GameObject.render not implemented');
    };

    GameObject.prototype.update = function () {
        alert('GameObject.update not implemented');
    };

    return GameObject;
})();