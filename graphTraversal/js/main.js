/**
 * Created by dimta on 02-May-16.
 */

var par = document.getElementById("paragraph");
var canvas = document.getElementById("canvas");
var goalNodeName = 'e';

function endGoalReached(goalNode) {
    return goalNode.visited;
}

function markNeighbouringNodes(currentNode, unvisitedNodes) {

    // loop through all of the edge's target nodes
    //
    for (var currentEdge of currentNode.edges) {

        // set their new distance which is currentNode.distance + currentEdge.cost
        //
        var targetNode = currentEdge.targetNode;

        //TODO debug here to see if the proper nodes are added, i.e. if it's visited already don't add
        // TODO can't find the proper node yet, doesn't go back to traverse further, i.e. currently
        // the implementation can't reach node E

        if (targetNode.visited == false) {

            targetNode.distance = currentNode.distance + currentEdge.cost;

        }
    }
}


function retrieveFromVisited(nextLowestNode, unvisitedNodes) {
    var temp = null;

    for (var i = 0; i < unvisitedNodes.length; i++) {

        if (unvisitedNodes[i].name == nextLowestNode.name) {

            temp = unvisitedNodes[i];

            unvisitedNodes.splice(i, 1);

            break;
        }

    }

    return temp;
}

function refreshPriorityQueue(neighbouringNodes) {
    var tempPQ = new PriorityQueue({
        comparator: function (a, b) {
            return a.distance - b.distance;
        }
    });

    var origLength = neighbouringNodes.length;
    for (var i = 0; i < origLength; i++) {
        tempPQ.queue(neighbouringNodes.dequeue());
    }

    return tempPQ;

}

function findNextLowestPath(neighbouringNodes, unvisitedNodes, currentNode) {

    // calculate the distance of the neighbours
    //
    markNeighbouringNodes(currentNode, neighbouringNodes);

    neighbouringNodes = refreshPriorityQueue(neighbouringNodes);

    return neighbouringNodes;
}

/**
 * Check if the vertex is contained in the path so far
 *
 * @param totalPath The total path covered so far
 * @param currentNode The current vertex to be considered
 * @returns {boolean} True if the vertex has been visited
 */
function pathContains(totalPath, currentNode) {

    // if there's anything at all in the total path
    //
    if (totalPath.length > 0) {

        // if any of the paths in the totalPath array contain the
        // name of the current node, return true
        for (var p of totalPath) {
            if (p.name == currentNode.name) {
                return true;
            }
        }
    }

    return false;
}
function dijkstraAlgorithm(unvisitedNodes) {

    debugger;

    unvisitedNodes[0].distance = 0;
    
    var goalNode = unvisitedNodes[4];

    var neighbouringNodes = new PriorityQueue({
        comparator: function (a, b) {
            return a.distance - b.distance;
        },
        initialValues: unvisitedNodes
    });


    // holds the path from start node to end node
    //
    var visitedNodes = [];

    // loop through all connections and find the closes one
    //
    var currentNode;
    do {

        debugger;
try{
        currentNode = neighbouringNodes.dequeue();

        currentNode.visited = true;
visitedNodes.push(currentNode);
        neighbouringNodes = findNextLowestPath(neighbouringNodes, unvisitedNodes, currentNode);
        
        }catch(e){
            break;
        }

    } while (!endGoalReached(goalNode));

    debugger;

}
(function main() {

    // initial starting point of the javascript
    var a = new GraphNode('a');
    var b = new GraphNode('b');
    var c = new GraphNode('c');
    var d = new GraphNode('d');
    var e = new GraphNode('e');
    var f = new GraphNode('f');

    var p = new Path(a, b, 4);
    var p1 = new Path(a, c, 2);

    var p2 = new Path(b, c, 3);
    var p3 = new Path(b, d, 2);
    var p4 = new Path(b, e, 3);

    var p5 = new Path(c, b, 1);
    var p6 = new Path(c, d, 4);
    var p7 = new Path(c, e, 5);
    var p8 = new Path(c, e, 5);

    var p9 = new Path(e, d, 1);

    var p10 = new Path(d, f, 6);
    var p11 = new Path(e, f, 3);

    var nodes = [a, b, c, d, e, f];

    dijkstraAlgorithm(nodes);

})();