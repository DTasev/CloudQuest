/**
 * This class increases the difficulty of the game
 * depending on how much score the player has and
 * how long have they survived.
 *
 * @author Dimitar Tasev
 *
 */

var difficultyManager = (function () {

    // Used to increase the deflation of platforms' speed
    //
    var scrollSpeedUpTimer = 0;

    // Used to reduce the amount of platforms available on the screen
    //
    var platformScoreCounter = 0;

    var MAX_SCROLL_SPEED_DIFFICULTY = 2;

    var MINIMUM_PLATFORM_COUNT_DIFFICULTY = 6;

    var MAX_DEFLATE_SPEED_DIFFICULTY = 3;


    /**
     * Increments the difficulty in a few different ways:
     * Every 20 coins 1 less platform spawns,
     *
     */
    this.updateDifficulty = function () {

        var currentGameScore = scoreManager.getScore();

        if (platformManager.MAXIMUM_PLATFORMS > MINIMUM_PLATFORM_COUNT_DIFFICULTY
            && currentGameScore - platformScoreCounter > 20) {

            // Reset score timer
            //
            platformScoreCounter = currentGameScore;

            // Increase difficulty
            platformManager.MAXIMUM_PLATFORMS -= 1;

        }

        if (platformManager.difficultyModifier < MAX_DEFLATE_SPEED_DIFFICULTY
            && !(scrollSpeedUpTimer < 400)) {
            console.log('deflate speed: ' + scrollSpeedUpTimer);

            // Reset timer counter
            //
            scrollSpeedUpTimer = 0;

            // Increase difficulty
            //
            platformManager.difficultyModifier += 0.2;

        }

        if (gameScrollManager.scrollingSpeed < MAX_SCROLL_SPEED_DIFFICULTY && ((scrollSpeedUpTimer + platformScoreCounter) % 230 == 0)) {
            console.log('scrolling speed: ' + scrollSpeedUpTimer);

            gameScrollManager.scrollingSpeed += 0.1;

        }

        // Increment timers
        //
        scrollSpeedUpTimer++;
    };


    this.resetDifficultyTimers = function () {
        platformScoreCounter = 0;
        scrollSpeedUpTimer = 0;
    };

    return this;
})();
