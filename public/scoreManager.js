/**
 * Created by dimta on 20-Apr-16.
 */

var scoreManager = (function () {

    var score = 0;
    var timeScore = 0;

    this.increaseScore = function (coinObject) {
        debugger;
        score += coinObject.difficulty;

        // sohows that coinobject.difficulty is NaN
        console.log('Current score: ' + score);
    };

    this.getScore = function () {
        return score;
    };

    this.updateScore = function () {
        document.getElementById('gameScore').innerHTML = '' + score;
    };

    return this;
})();