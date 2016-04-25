var Player = (function () {

    Player.prototype = new GameObject();
    Player.prototype.constructor = Player;

    /**
     * @param x X position of the object
     * @param y Y position of the object
     * @param width Width of the object
     * @param height Height of the object
     * @param runningSpeed Running speed used for the movement of the player
     * @param gravityWeight Gravity weight used for applying gravity to the player
     * @constructor
     */
    function Player(x, y, width, height, runningSpeed, gravityWeight) {

        debugger;

        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;

        // Values for object updates
        // such as movement and gravity
        //
        this.runningSpeed = runningSpeed;
        this.gravityWeight = gravityWeight;

        // ENUM-like navigation to use throughout the program
        // to make a consistent way to refer to directions
        //
        this.navigation = {
            'up'    : 3,
            'down'  : 4,
            'left'  : 1,
            'right' : 2
        };

        // The current direction of the player object,
        // used in the movement class to determine if going
        // left or right on the screen and update
        //
        this.direction  = 0;

        // Player object states, used for jumping, movement
        // and sprite animations
        //
        this.states = {
            'idle'      : 1,    // 1
            'jump'      : 2,    // 2
            'run'       : 3,    // 3
            'falling'   : 5     // 5
        };

        // start off in idle state
        //
        this.currentState = 1;
    }


    /**
     * Method available in every object class,
     * it uses the renderManager to render itself
     * on screen
     * @param canvasContext context of th
     */
    Player.prototype.render = function (canvasContext) {
        // The renderRectangle can be uncommented so that the
        // player's hit box can be seen on screen
        // as it doesn't fit the sprite all of the time
        //
        // renderManager.renderRectangle(canvasContext, this);
        renderManager.renderPlayer(canvasContext, this);
    };


    return Player;
})();