/**
 * Created by dimta on 04-May-16.
 */

var display = (function () {

    function Display(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.nodes = [];
    }

    Display.prototype.display = function () {
        // will display the node's relations currently in the this.nodes array

        // todo lineTo method can be used
    };

    return Display;
})();