/**
 * This class increases the difficulty of the game
 * depending on how much score the player has and
 * how long have they survived.
 *
 * @author Dimitar Tasev
 *
 */

var difficultyManager = (function () {

    var scrollSpeedUpTimer = 0;
    var scrollSpeedUpScore = 0;

    var scrollDifficulty = gameScrollManager.scrollingSpeed;
    var platformDifficulty = {
        "platformCount" : platformManager.MAXIMUM_PLATFORMS,
        'deflateSpeed' : platformManager.difficultyModifier
    };

    var MAX_SCROLL_SPEED_DIFFICULTY = 2;

    var MINIMUM_PLATFORM_COUNT_DIFFICULTY = 2;

    var MAX_DEFLATE_SPEED_DIFFICULTY = 2;


    this.update = function () {
        var currentScore = scoreManager.getScore();
        if (platformDifficulty.platformCount > MINIMUM_PLATFORM_COUNT_DIFFICULTY
            &&currentScore - scrollSpeedUpScore > 10) {
            console.log('im here');
            scrollSpeedUpScore = currentScore;

            platformDifficulty.platformCount -= 1;
        }
    };

    return this;
})();
