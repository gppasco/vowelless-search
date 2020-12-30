/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables & switches
let myDataTable

let promises = [
    d3.csv("data/vowelless.csv")
]

Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

function initMainPage(dataArray) {

    myDataTable = new DataTable("resultsDiv", dataArray[0])

}

// Execute a function when the user releases a key on the keyboard
document.getElementById("vowellessPrompt").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("vowellessSubmit").click();
    }
});



