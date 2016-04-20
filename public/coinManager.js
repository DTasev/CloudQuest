/**
 * Created by dimta on 19-Apr-16.
 */

var coinManager = (function () {

    this.generateCoin = function () {

    };

    this.removeCoin = function (positionInGameObjects, gameObjects) {
        gameObjects.splice(positionInGameObjects, 1);
    };

    return this;
})();