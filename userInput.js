/**
 * Created by Bastien on 03/11/2014.
 */


var inputArray = [];

function userInput(notification, context, result)
{
    this.notification = notification;
    this.context = context;
    this.result = result;


}

/*userInput.prototype.toString = function()
{
    return "plop";
}*/

function onChoice(result)
{
    var currentInput = new userInput(currentNotif, $('#contextSelection').find(":selected").text(), result)
    if(currentNotif.sourceApp != "All done !")
    {
        inputArray.push(currentInput);
    }

    refreshInputNumber();

    newNotification();
}

function saveToDisk()
{
    var blob = new Blob([JSON.stringify(inputArray)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "SoulShepherd.json");
}


function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var file = evt.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function(){
                var text = reader.result;
                inputArray = JSON.parse(text);
                console.log(inputArray.length + " input loaded");
                refreshInputNumber();
        }

        reader.readAsText(file);

    } else {
        alert("Failed to load file");
    }
}

$( document ).ready(function() {
    document.getElementById('fileInput').addEventListener('change', readSingleFile, false);
});

function refreshInputNumber()
{
    $('#sizeInputArray').text(inputArray.length);
}
