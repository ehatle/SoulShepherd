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
    inputArray.push(currentInput);

    $('#inputDisplay').text(JSON.stringify(inputArray));

    newNotification();
}

function saveToDisk()
{
    var blob = new Blob([JSON.stringify(inputArray)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "SoulShepherd.json");
}

function openFile()
{
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("file API ok");
    } else {
        console.log('The File APIs are not fully supported in this browser.');
    }
}