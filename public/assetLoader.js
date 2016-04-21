/**
 * Loads the game assets into dictionaries that can
 * be accessed from everywhere in the game
 *
 */
var assetLoader = (function assetLoaderInit() {

    // The number of asset files
    //
    var HERO_FRAMES_COUNT = 20;
    var COIN_FRAMES_COUNT = 6;
    var PLATFORM_FRAMES_COUNT = 2;
    var SOUND_FILES_COUNT = 1;
    var IMAGE_FILES_COUNT = 1;

    // Variables for constructing the
    // path to the game assets
    //
    var SEPARATOR = '__',
        PADDING = '00',
        HERO_URL = './heroSprites/',
        COIN_URL = './coinSprites/',
        PLATFORM_URL = './platformSprites/',
        SOUNDS_URL = './sound/',
        IMAGES_URL = './images/',
        SPRITE_EXTENSION = '.png',
        SOUND_EXTENSION = '.wav',
        IMAGES_EXTENSION = '.png',
        s,
        f,
        len,
        frames,
        frameNumber,
        hero = {},
        coin,
        platforms,
        sounds = {},
        images = {};

    // The hero states, provides the names for the sprite images
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

            // Adds the 00 padding of the file names
            //
            frameNumber = (PADDING + f);

            // Construct the file path
            //
            frames[f].src = HERO_URL + hero_states[s] + SEPARATOR + frameNumber + SPRITE_EXTENSION;
        }

        hero[hero_states[s].toLowerCase()] = frames;
    }

    // Provides the name for the coin files
    //
    var coin_filename = 'Coin';

    // Load the coin sprite images into an array
    //
    frames = [];
    for (f = 0; f < COIN_FRAMES_COUNT; f++) {
        frames[f] = new Image();

        // Adds the 00 padding of the file names
        //
        frameNumber = (PADDING + f);

        // Construct the file path
        //
        frames[f].src = COIN_URL + coin_filename + SEPARATOR + frameNumber + SPRITE_EXTENSION;
    }

    coin = frames;

    // Provides the name for the platform files
    //
    var platform_filename = 'Platform';

    // Load the platform sprites into an array
    //
    frames = [];
    for (f = 0; f < PLATFORM_FRAMES_COUNT; f++) {
        frames[f] = new Image();

        // Adds the 00 padding of the file names
        //
        frameNumber = (PADDING + f);

        // Construct the file path
        //
        frames[f].src = PLATFORM_URL + platform_filename + SEPARATOR + frameNumber + SPRITE_EXTENSION;
    }

    platforms = frames;


    // Array containing the different names for the sound files
    //
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

            // Construct the file path
            //
            frames[f].src = SOUNDS_URL + sound_files[s] + SEPARATOR + frameNumber + SOUND_EXTENSION;
        }

        sounds[sound_files[s].toLowerCase()] = frames;
    }


    // Array containing the different names for the sound files
    //
    var image_files = [
        {
            'name': 'Background',
            'size': 1
        },
        {
            'name' : 'Cloud',
            'size': 3
        }
    ];

    // Load the sounds into the same frames array
    // name not changed so that the code isn't
    // cluttered with different variables
    //

    for (s = 0, len = image_files.length; s < len; s++) {
        frames = [];

        for (f = 0; f < image_files[s].size; f++) {

            frames[f] = new Image();

            // Adds the 00 padding of the file names
            //
            frameNumber = (PADDING + f);

            // Construct the file path
            //
            frames[f].src = IMAGES_URL + image_files[s].name + SEPARATOR + frameNumber + IMAGES_EXTENSION;
        }

        images[image_files[s].name.toLowerCase()] = frames;
    }

    return {hero, coin, platforms, sounds, images}
})();