/**
 * Created by dimta on 19-Apr-16.
 */

var coinManager = (function () {

    this.MAX_COINS = 5;
    var currentCoins = 0;

    this.generateCoins = function (gameObjects) {

        if (currentCoins < MAX_COINS) {

            var numberOfCoins = Math.floor((Math.random() * 5) + 1);

            for (var n = 0; n < numberOfCoins; n++) {

                // generate the coin within the canvas

                var x = Math.floor((Math.random() * canvas.width - 30) + 30);
                var y = Math.floor((Math.random() * canvas.height - 130) - 30);

                var difficulty = 1;

                gameObjects.push(new Coin(x, y, difficulty));

                currentCoins += 1;
            }
        }
    };

    this.removeCoin = function (positionInGameObjects, gameObjects) {

        gameObjects.splice(positionInGameObjects, 1);

        currentCoins -= 1;
    };


    this.resetCoinGeneration = function () {
        currentCoins = 0;
    };

    return this;
})();