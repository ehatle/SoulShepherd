/**
 * Created by Bastien on 03/11/2014.
 */

var currentNotif;

function Notification(sourceApp, sender, content) {
    // Public properties, assigned to the instance ('this')
    this.sourceApp = sourceApp;
    this.sender = sender;
    this.content = content;
}

var appArray = ["Messenger", "SMS", "SnapChat", "eMail", "Calendar Alarm", "Game", "Facebook"];

function pickRandomApp()
{
    return appArray[Math.floor(Math.random()*appArray.length)];
}

function newNotification()
{
    var sourceApp = pickRandomApp();
    currentNotif = new Notification(sourceApp, "Mom", "no content");

    replaceOnScreen();
}

function replaceOnScreen()
{
    $('#sourceApp').text(currentNotif.sourceApp);
    $('#sender').text(currentNotif.sender);
    $('#notificationContent').text(currentNotif.content);
}

$(document).ready( function()
    {
        newNotification();

    });
