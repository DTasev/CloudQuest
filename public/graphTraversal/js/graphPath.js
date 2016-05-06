/**
 * Created by dimta on 02-May-16.
 */

var Path = (function () {
    function Path(sourceNode, targetNode, cost) {
        this.sourceNode = sourceNode;
        this.targetNode = targetNode;
        this.cost = cost;

        sourceNode.addPath(this);
    }

    return Path;
})();