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
