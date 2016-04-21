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
    var PLATFORM_FRAMES_COUNT = 2;
    var SOUND_FILES_COUNT = 1;

    // Variables for constructing the
    // path to the sprite images
    //
    var SEPARATOR = '__',
        PADDING = '00',
        HERO_URL = './heroSprites/',
        COIN_URL = './coinSprites/',
        PLATFORM_URL = './platformSprites/',
        SOUNDS_URL = './sound/',
        SPRITE_EXTENSION = '.png',
        SOUND_EXTENSION = '.wav',
        s,
        f,
        len,
        frames,
        frameNumber,
        hero = {},
        coin,
        platforms,
        sounds = {};

    // Sprite image hero_states
    //
    var hero_states = [
        'Idle',
        'Jump',
        'Run'
    ];

    // Load the hero sprite images into an array
    //
    for (s = 0, len = hero_states.length; s < len; s++) {
        frames = [];

        for (f = 0; f < HERO_FRAMES_COUNT; f++) {
            frames[f] = new Image();

            // Adds the 00 padding of the filenames
            //
            frameNumber = (PADDING + f);

            frames[f].src = HERO_URL + hero_states[s] + SEPARATOR + frameNumber + SPRITE_EXTENSION;
        }

        hero[hero_states[s].toLowerCase()] = frames;
    }


    var coin_filename = 'Coin';

    // Load the coin sprite images into an array
    //
    frames = [];
    for (f = 0; f < COIN_FRAMES_COUNT; f++) {
        frames[f] = new Image();

        frameNumber = (PADDING + f);

        frames[f].src = COIN_URL + coin_filename + SEPARATOR + frameNumber + SPRITE_EXTENSION;
    }

    coin = frames;


    var platform_filename = 'Platform';
    // Load the platform sprites into an array
    //
    frames = [];
    for (f = 0; f < PLATFORM_FRAMES_COUNT; f++) {
        frames[f] = new Image();

        frameNumber = (PADDING + f);

        frames[f].src = PLATFORM_URL + platform_filename + SEPARATOR + frameNumber + SPRITE_EXTENSION;
    }

    platforms = frames;


    var sound_files = [
        'Click',
        'Coin',
        'Menu',
        'Run',
        'Jump'
    ];

    // Load the sounds into the same frames array
    // name not changed so that the code isn't
    // cluttered with different variables
    //

    for (s = 0, len = sound_files.length; s < len; s++) {
        frames = [];

        for (f = 0; f < SOUND_FILES_COUNT; f++) {
            frames[f] = new Audio();

            // Adds the 00 padding of the file names
            //
            frameNumber = (PADDING + f);

            frames[f].src = SOUNDS_URL + sound_files[s] + SEPARATOR + frameNumber + SOUND_EXTENSION;
        }

        sounds[sound_files[s].toLowerCase()] = frames;
    }

    return {hero, coin, platforms, sounds}
})();