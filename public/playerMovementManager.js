/**
 * Created by dimta on 13-Apr-16.
 */
var playerMovementManager = (function () {
     
    this.handleMovement = function (playerDirection, playerObject) {
        // TODO acceleration
        switch(playerDirection){
            case 1:
                playerObject.x -= playerObject.runningSpeed;
                break;
            case 2:
                playerObject.x += playerObject.runningSpeed;
                break;
            case 3:
                playerObject.y -= playerObject.runningSpeed;
                break;
            case 4:
                playerObject.y += playerObject.runningSpeed;
                break;
            default:
                break;
        }
    };
    return this;
})();