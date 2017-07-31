/**
 * Created by dimta on 25-Apr-16.
 */

(function main() {
    var text = document.getElementById("textPar");

    //get user input
    //
    var userInput = prompt('NUMBER', '');

var sum = 0;
    for(var i = 1; i <= userInput; i++){
        // does this thing 10 times
        sum += i;
    }

    text.innerHTML = sum;



})();