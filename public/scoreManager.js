/**
 * Created by dimta on 20-Apr-16.
 */

var scoreManager = (function () {

    var score = 0;
    var timeSurvived = 0;

    var timerInterval;


    /**
     * Starts the timer and initialises the score and
     * time survived to 0.
     *
     * This must be called when initialising the game
     * so that the score and time survived is counted.
     *
     */
    this.startTimer = function () {
        score = 0;
        timeSurvived = 0;

        timerInterval = setInterval(function () {

            timeSurvived++
        }, 1000);
    };


    /**
     * Stop the timer.
     * This must be executed when the game is over in order
     * to have correct countdown of the time played.
     */
    this.stopTimer = function () {
        clearInterval(timerInterval);
    };


    /**
     * Increases the game score dependent on the coin's difficulty value
     *
     * @param coinObject
     */
    this.increaseScore = function (coinObject) {

        score += coinObject.difficulty;

    };


    /**
     * Returns the current score and time time survived in seconds.
     *
     * @returns {{score: number, timeSurvived: number}}
     */
    this.getCurrentScoreAndTimeSurvived = function () {
        return {'score': score, 'timeSurvived': timeSurvived};
    };


    /**
     * Returns the score and time saved in the local storage
     * @returns {{score, timeSurvived}}
     */
    this.getSavedScoreAndTimeSurvived = function () {
        return {'score' : localStorage.getItem('score'), 'timeSurvived' : localStorage.getItem('timeSurvived')}
    };


    function drawCoinNextToScore(canvasContext) {
        var coinSprite = spriteAnimator.getCoinSprite();
        canvasContext.drawImage(coinSprite.image, 0, 0, coinSprite.image.width, coinSprite.image.height, canvas.width - 50, 15, 20, 20);
    }


    /**
     * Renders the score on the screen, also renders a coin
     */
    this.renderScore = function (canvasContext) {

        // document.getElementById('gameScore').innerHTML = 'Score: ' + score + '<br/>Time Survived: ' + timeSurvived;

        canvasContext.font = "20px Georgia";
        canvasContext.fillStyle = "Black";
        canvasContext.fillText('Score: ' + score, canvas.width - 100, 30);

        drawCoinNextToScore(canvasContext);

        canvasContext.fillText('Time Survived: ' + timeSurvived, canvas.width - 140, 60);

    };


    /**
     * Saves the score and the time survived in HTML5's local storage.
     *
     * They are saved with the attributes 'score' and 'timeSurvived'.
     *
     */
    this.saveScoreLocally = function () {

        // Check if the browser supports local storage
        //
        if (typeof(Storage) !== "undefined") {

            localStorage.setItem('score', score);
            localStorage.setItem('timeSurvived', timeSurvived);

        } else {

            document.getElementById('gameScore').innerHTML = 'Local storage not supported.';
        }
    };


    /**
     * Resets the local storage values.
     */
    this.resetLocalScores = function () {

        localStorage.setItem('score', 0);
        localStorage.setItem('timeSurvived', 0);

    };


    this.getScore = function () {
        return score;
    };


    this.getTimer = function () {
        return timeSurvived;
    };


    return this;
})();