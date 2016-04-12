function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(canvas, ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, canvas.height-50, canvas.width, 50);
}

function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(90, 90, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
}

function drawPlayer(canvas, ctx) {
    var playerSprite = document.getElementById("playerSprite");
    // x 809 y 577

    var f = 0;
        f++;
        // draw the car
        if (f == 2) {
            f = 4;
        }
        if (f == 6) {
            f = 0;
        }
        ctx.drawImage(playerSprite, 809, 577, 60, 56, 50, 60, 30, 40);
}

function render(canvas, ctx) {
    drawSquare(canvas, ctx);
    drawCircle(ctx);
    drawPlayer(canvas, ctx);
}

function handleInput() {

}

function update() {

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

(function main() {
    console.log('hello');

    var FRAMES = 60;
    var i = 30;

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');

    //TODO set keyboard controls

    //TODO initialise player and obstacles

    return setInterval(function () {
        gameLoop(canvas, ctx)
    }, 1000 / FRAMES);
})();

var imageLoader = (function(){
    this.images = [];

    this.loadImages = function () {
        
    }
})

/**
 * Asset pre-loader object. Loads all images
 */
var assetLoader = (function() {
    // images dictionary
    var imageArray;
    this.imgs        = {
        "bg"            : imageArray
    };
    var assetsLoaded = 0;                                // how many assets have been loaded
    var numImgs      = Object.keys(this.imgs).length;    // total number of image assets
    this.totalAssest = numImgs;                          // total number of assets
    /**
     * Ensure all assets are loaded before using them
     * @param {number} dic  - Dictionary name ('imgs')
     * @param {number} name - Asset name in the dictionary
     */
    function assetLoaded(dic, name) {
        // don't count assets that have already loaded
        if (this[dic][name].status !== "loading" ) {
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
    this.downloadAll = function() {
        var _this = this;
        var src;
        // load images
        for (var img in this.imgs) {
            if (this.imgs.hasOwnProperty(img)) {
                src = this.imgs[img];
                // create a closure for event binding
                (function(_this, img) {
                    _this.imgs[img] = new Image();
                    _this.imgs[img].status = "loading";
                    _this.imgs[img].name = img;
                    _this.imgs[img].onload = function() { assetLoaded.call(_this, "imgs", img) };
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
assetLoader.finished = function() {
    startGame();
}