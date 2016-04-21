/**
 * Created by dimta on 20-Apr-16.
 */

var MainMenu = (function () {
    var selectedItem = -1;

    function MainMenu(title, canvasContext) {
        this.title = title;
        this.ctx = canvasContext;
    }

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

        this.ctx.fillText('Controls', canvas.width / 2, 300);

        checkIfSelectedItem(2, this.ctx);

        this.ctx.fillText('Reset High Score', canvas.width / 2, 350);

        checkIfSelectedItem(3, this.ctx);

        if (soundManager.soundMuted == true) {

            this.ctx.fillText('Unmute Sounds', canvas.width / 2, 400);

        } else {

            this.ctx.fillText('Mute Sounds', canvas.width / 2, 400);

        }


    };

    function checkIfSelectedItem(itemNumber, ctx) {
        if (selectedItem == itemNumber) {
            ctx.fillStyle = "Yellow";
            ctx.font = "40px Georgia";

        } else {

            ctx.fillStyle = "White";
            ctx.font = "30px Georgia";

        }
    }

    MainMenu.prototype.update = function () {

        document.onclick = mainMenuButtonClickAction;
        document.onmousemove = handleMouseMovement;

        function handleMouseMovement(event) {
            var dot, eventDoc, doc, body, pageX, pageY;

            var mousePos = getMousePos(canvas, event);
            var oldSelectedItem = selectedItem;

            if (mousePos.y > 360) {

                selectedItem = 3;

            } else if (mousePos.y > 310) {
                selectedItem = 2;
            }
            else if (mousePos.y > 260) {

                selectedItem = 1;


            } else {
                selectedItem = 0;

            }

            if (oldSelectedItem !== selectedItem && currentGameState === gameStates.menu) {
                soundManager.play(soundManager.sounds.menu);
            }


            console.log('MouseX: ' + mousePos.x + '\nMouseY: ' + mousePos.y);

        }

        function mainMenuButtonClickAction() {

            if (currentGameState === gameStates.menu) {
                soundManager.play(soundManager.sounds.click);

                switch (selectedItem) {
                    case 0:

                        // initialise all of the game objects
                        // so that we can start a new game
                        // or reset any left over objects
                        // from the last one
                        //
                        initialiseGameObjects();

                        // change the game state to playing
                        // so that the game switches the screen and starts
                        // the playing game mode
                        //
                        currentGameState = gameStates.playing;

                        break;

                    case 2:

                        scoreManager.resetLocalScores();

                        break;

                    case 3:

                        soundManager.soundMuted = soundManager.soundMuted != true;

                        break;

                }
            }
        }

        function getMousePos(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: Math.floor((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
                y: Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
            };
        }
    };

    return MainMenu;
})
();