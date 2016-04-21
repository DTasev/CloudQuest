/**
 * Handles the coins in the game. This includes generation and removal.
 * It also counts how many coins there are at any one point and limits
 * how many coins can be spawned.
 *
 * @author Dimitar Tasev
 */
var coinManager = (function () {

    // The max number of coins that can be on the screen
    // this is not entirely accurate, but it does limit them
    //
    this.MAX_COINS = 5;


    var currentCoins = 0;


    /**
     * Generates coins at a random position and adds them in the
     * game objects array to be updated and rendered
     *
     * @param gameObjects
     */
    this.generateCoins = function (gameObjects) {

        if (currentCoins < MAX_COINS) {

            var numberOfCoins = Math.floor((Math.random() * 5) + 1);

            for (var n = 0; n < numberOfCoins; n++) {

                // generate the coin within the canvas

                var x = Math.floor((Math.random() * canvas.width - 30) + 30);
                var y = Math.floor((Math.random() * canvas.height - 160) + 1);

                var difficulty = 1;

                gameObjects.push(new Coin(x, y, difficulty));

                currentCoins += 1;
            }
        }
    };


    /**
     * Removes a coin from the game objects array and
     * lowers down the counter for how many coins are active
     *
     * @param positionInGameObjects
     * @param gameObjects
     */
    this.removeCoin = function (positionInGameObjects, gameObjects) {

        gameObjects.splice(positionInGameObjects, 1);

        currentCoins -= 1;
    };


    this.resetCoinGeneration = function () {
        currentCoins = 0;
    };

    return this;
})();