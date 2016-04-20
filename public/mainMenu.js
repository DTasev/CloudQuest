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

        document.onclick = changeGameState;
        document.onmousemove = handleMouseMovement;

        function handleMouseMovement(event) {
            var dot, eventDoc, doc, body, pageX, pageY;

            var mousePos = getMousePos(canvas, event);

            if (mousePos.y > 310) {

                selectedItem = 2;

            } else if (mousePos.y > 260) {

                selectedItem = 1;

            } else {
                selectedItem = 0;

            }


            console.log('MouseX: ' + mousePos.x + '\nMouseY: ' + mousePos.y);

        }

        function changeGameState() {

            if (currentGameState === gameStates.menu) {
                switch (selectedItem) {
                    case 0:

                        initialiseGameObjects();
                        currentGameState = gameStates.playing;

                        break;

                    case 2:

                        scoreManager.resetLocalScores();

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
})();