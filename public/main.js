var gameObjects = [];
var playerDirection;
var LEFT = 1;
var RIGHT = 2;

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(canvas, ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(90, 90, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
}

function drawPlayer(canvas, ctx) {

    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].render(ctx);
    }

    /* var f = 0;
     f++;
     // draw the car
     if (f == 2) {
     f = 4;
     }
     if (f == 6) {
     f = 0;
     }
     ctx.drawImage(playerSprite, 809, 577, 60, 56, 50, 60, 30, 40);*/
}

function render(canvas, ctx) {
    drawSquare(canvas, ctx);
    drawCircle(ctx);
    drawPlayer(canvas, ctx);
}

function handleInput() {

}

function applyGravity() {
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].gravity();
    }
}
function update() {
    applyGravity();
}

function gameLoop(canvas, ctx) {
    // removes last frame
    clear(canvas, ctx);

    // handles user action
    handleInput();

    // update the object for the frame
    update();

    // render objects for the frame on screen
    render(canvas, ctx);
}
/**
 * Source from http://stackoverflow.com/questions/3691461/remove-key-press-delay-in-javascript
 * @author http://stackoverflow.com/users/18936/bobince
 * @param keys
 * @param repeat
 * @constructor
 */
// Keyboard input with customisable repeat (set to 0 for no key repeat)
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    document.onkeydown = function (event) {
        var key = (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key]();
            if (repeat !== 0)
                timers[key] = setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup = function (event) {
        var key = (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key] !== null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur = function () {
        for (key in timers)
            if (timers[key] !== null)
                clearInterval(timers[key]);
        timers = {};
    };
}

(function main() {
    debugger;

    var FRAMES = 60;

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');

    //TODO set keyboard controls
    KeyboardController({
        37: function () {
            playerDirection = LEFT;
            console.log('left arrow key' + playerDirection);
        },
        39: function () {
            playerDirection = RIGHT;
            console.log('right arrow key' + playerDirection);
        },
        32: function () {
            PLAYER_JUMPING = true;
        }
    }, 1000 / FRAMES);

    //TODO initialise player and obstacles

    var player = new Player(40, 50, 10, 20, 5);
    gameObjects.push(player);


    return setInterval(function () {
        gameLoop(canvas, ctx)
    }, 1000 / FRAMES);
})();

var imageLoader = (function () {
    this.images = {
        "idle0": "Idle__000.png",
        "idle1": "Idle__001.png",
        "idle2": "Idle__002.png",
        "idle3": "Idle__003.png",
        "idle4": "Idle__004.png",
        "idle5": "Idle__005.png",
        "idle6": "Idle__006.png",
        "idle7": "Idle__007.png",
        "idle8": "Idle__008.png",
        "idle9": "Idle__009.png"
    };

    this.loadImages = function () {
        for (var img in images) {

        }
    }
})

/**
 * Asset pre-loader object. Loads all images
 */
var assetLoader = (function () {
    // images dictionary
    var imageArray;
    this.imgs = {
        "bg": imageArray
    };
    var assetsLoaded = 0;                                // how many assets have been loaded
    var numImgs = Object.keys(this.imgs).length;    // total number of image assets
    this.totalAssest = numImgs;                          // total number of assets
    /**
     * Ensure all assets are loaded before using them
     * @param {number} dic  - Dictionary name ('imgs')
     * @param {number} name - Asset name in the dictionary
     */
    function assetLoaded(dic, name) {
        // don't count assets that have already loaded
        if (this[dic][name].status !== "loading") {
            return;
        }
        this[dic][name].status = "loaded";
        assetsLoaded++;
        // finished callback
        if (assetsLoaded === this.totalAssest && typeof this.finished === "function") {
            this.finished();
        }
    }

    /**
     * Create assets, set callback for asset loading, set asset source
     */
    this.downloadAll = function () {
        var _this = this;
        var src;
        // load images
        for (var img in this.imgs) {
            if (this.imgs.hasOwnProperty(img)) {
                src = this.imgs[img];
                // create a closure for event binding
                (function (_this, img) {
                    _this.imgs[img] = new Image();
                    _this.imgs[img].status = "loading";
                    _this.imgs[img].name = img;
                    _this.imgs[img].onload = function () {
                        assetLoaded.call(_this, "imgs", img)
                    };
                    _this.imgs[img].src = src;
                })(_this, img);
            }
        }
    }

    return {
        imgs: this.imgs,
        totalAssest: this.totalAssest,
        downloadAll: this.downloadAll
    };
})();

assetLoader.finished = function () {
    startGame();
}

