/**
 * Created by dimta on 02-May-16.
 */
var GraphNode = (function () {

    function GraphNode(name) {
        this.name = name;
        this.edges = [];
        this.distance = 9999999;
        this.visited = false;
    }

    GraphNode.prototype.addPath = function (path) {
        this.edges.push(path);
    };

    GraphNode.prototype.setPath = function (path) {
        this.edges = path;
    };

    return GraphNode;
})();