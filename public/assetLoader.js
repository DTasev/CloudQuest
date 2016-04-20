/**
 * Loads the sprites for the game into an array
 *
 * Sprite Sources:
 *   - Coin Sprite Source: http://opengameart.org/content/spinning-coin-8-bit-sprite
 * @type {{hero}}
 */
var assetLoader = (function assetLoaderInit() {

    var finishedLoading = false;

    // The number of sprite images
    //
    var HERO_FRAMES_COUNT = 20;
    var COIN_FRAMES_COUNT = 6;

    // Variables for constructing the
    // path to the sprite images
    //
    var SEPARATOR = '__',
        PADDING = '00',
        HERO_URL = './heroSprites/',
        COIN_URL = './coinSprites/',
        EXTENSION = '.png',
        s,
        f,
        len,
        frames,
        frameNumber,
        hero = {},
        coin = {};

    // Sprite image hero_states
    //
    var hero_states = [
        'Idle',
        'Jump',
        'Run'
    ];

    var coin_filename = 'Coin';

    // Load the hero sprite images into an array
    //
    for (s = 0, len = hero_states.length; s < len; s++) {
        frames = [];

        for (f = 0; f < HERO_FRAMES_COUNT; f++) {
            frames[f] = new Image();

            // Adds the 00 padding of the filenames
            //
            frameNumber = (PADDING + f);

            frames[f].src = HERO_URL + hero_states[s] + SEPARATOR + frameNumber + EXTENSION;
        }

        hero[hero_states[s].toLowerCase()] = frames;
    }

    frames = [];
    for (f = 0; f < COIN_FRAMES_COUNT; f++) {
        frames[f] = new Image();

        frameNumber = (PADDING + f);

        frames[f].src = COIN_URL + coin_filename + SEPARATOR + frameNumber + EXTENSION;
    }

    coin = frames;

    return {hero, coin}
})();