/**
 * This class manages the sound for the game
 *
 * @author Dimitar Tasev
 */
var soundManager = (function () {

    // Variable to control if the game's sound is muted
    //
    this.soundMuted = false;


    // Inner class sound counter for when having more than one file
    // for a function, i.e. 2 files for running that will be swapped
    //
    var soundCounter = 0; // not user currently


    // Volume of the sounds that will be played
    // A 'master' volume for all sounds
    //
    this.volume = 0.2;


    this.sounds = {
        'click' : assetLoader.sounds.click[0],
        'coin'  : assetLoader.sounds.coin[0],
        'menu'  : assetLoader.sounds.menu[0],
        'run'   : assetLoader.sounds.run[0],
        'jump'  : assetLoader.sounds.jump[0]
    };


    this.play = function (sound) {
        if (!this.soundMuted) {
            sound.volume = this.volume;
            sound.play();
        }
    };


    return this;
})();