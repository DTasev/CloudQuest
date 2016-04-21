/**
 * The Main Menu class of the game.
 * It renders, updates and tracks any mouse actions on it
 * including mouse movement for menu selection and clicking
 * for menu activation.
 *
 * @author Dimitar Tasev
 */
var MainMenu = (function () {
    var selectedItem = -1;
    var localGameReference;

    function MainMenu(title, canvasContext, game) {
        this.title = title;
        this.ctx = canvasContext;
        localGameReference = game;
    }


    /**
     * Renders the main menu text on the screen
     */
    MainMenu.prototype.render = function () {
        this.ctx.fillStyle = "Black";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "White";

        this.ctx.font = "60px Georgia";

        this.ctx.fillText(this.title, canvas.width / 2, 150);

        this.ctx.font = "30px Georgia";

        checkIfSelectedItem(0, this.ctx);

        this.ctx.fillText('New Game', canvas.width / 2, 250);

        checkIfSelectedItem(1, this.ctx);

        this.ctx.fillText('Reset High Score', canvas.width / 2, 300);

        checkIfSelectedItem(2, this.ctx);

        if (soundManager.soundMuted) {

            this.ctx.fillText('Unmute Sounds', canvas.width / 2, 350);

        } else {

            this.ctx.fillText('Mute Sounds', canvas.width / 2, 350);

        }


    };


    /**
     * Colours the selected item in yellow and increases the font size
     *
     * @param itemNumber
     * @param ctx
     */
    function checkIfSelectedItem(itemNumber, ctx) {
        if (selectedItem == itemNumber) {
            ctx.fillStyle = "Yellow";
            ctx.font = "40px Georgia";

        } else {

            ctx.fillStyle = "White";
            ctx.font = "30px Georgia";

        }
    }


    /**
     * Updates the menu to show which item is currently selected
     *
     * On click it activates the effect and plays a sound.
     */
    MainMenu.prototype.update = function () {

        document.onclick = mainMenuButtonClickAction;
        document.onmousemove = handleMouseMovement;

        function handleMouseMovement(event) {
            var dot, eventDoc, doc, body, pageX, pageY;

            var mousePos = getMousePos(canvas, event);
            var oldSelectedItem = selectedItem;

            if (mousePos.y > 310) {

                selectedItem = 2;

            } else if (mousePos.y > 260) {

                selectedItem = 1;

            } else {

                selectedItem = 0;

            }

            if (oldSelectedItem !== selectedItem && localGameReference.currentGameState === localGameReference.gameStates.menu) {
                soundManager.play(soundManager.sounds.menu);
            }

        }


        /**
         * If the left mouse button is clicked it does a different
         * action depending on the selected menu member.
         *
         */
        function mainMenuButtonClickAction() {
            if (localGameReference.currentGameState === localGameReference.gameStates.menu) {
                soundManager.play(soundManager.sounds.click);

                switch (selectedItem) {
                    case 0:

                        // initialise all of the game objects
                        // so that we can start a new game
                        // or reset any left over objects
                        // from the last one
                        //
                        localGameReference.initialiseGameObjects();

                        // change the game state to playing
                        // so that the game switches the screen and starts
                        // the playing game mode
                        //
                        localGameReference.currentGameState = localGameReference.gameStates.playing;

                        break;

                    case 1:

                        scoreManager.resetLocalScores();

                        break;

                    case 2:

                        soundManager.soundMuted = soundManager.soundMuted != true;

                        break;

                }
            }
        }


        /**
         * Returns the mouse position relative to the canvas, not the page
         *
         * @param canvas
         * @param event
         * @returns {{x: number, y: number}}
         */
        function getMousePos(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: Math.floor((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
                y: Math.floor((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
            };
        }
    };

    return MainMenu;
})();