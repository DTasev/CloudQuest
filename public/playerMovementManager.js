/**
 * Created by dimta on 13-Apr-16.
 */
var playerMovementManager = (function () {
     
    this.handleMovement = function (playerDirection, playerObject) {
        switch(playerDirection){
            case 1:
                playerObject.x -= 1;
                break;
            case 2:
                playerObject.x += 1;
                break;
            default:
                break;
        }
    };
    return this;
})();