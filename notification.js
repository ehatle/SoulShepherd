/**
 * Created by Bastien on 03/11/2014.
 */

var currentNotif;
var notificationArray = [];

function Notification(sourceApp, sender, content) {
    // Public properties, assigned to the instance ('this')
    this.sourceApp = sourceApp;
    this.sender = sender;
    this.content = content;
}



function pickRandomNotif()
{
    var index = Math.floor(Math.random()*notificationArray.length);

    for(var i= index; i >= 0; i--)
    {
        if(notificationArray[i].used==0)
        {
            notificationArray[i].used=1;
            return notificationArray[i].notification;
        }
    }
    for(var i= index; i < notificationArray.length; i++)
    {
        if(notificationArray[i].used==0)
        {
            notificationArray[i].used=1;
            return notificationArray[i].notification;
        }
    }

    return new Notification("All done !","No more notification","All the notifications have been evaluated. Congratulation");
}

function newNotification()
{
    currentNotif = pickRandomNotif();
    replaceOnScreen();
}

function replaceOnScreen()
{
    $('.sourceApp').text(currentNotif.sourceApp);
    if(currentNotif.sender != "")
    {
        $('.sender').text("From: " + currentNotif.sender);
    }
    else
    {
        $('.sender').text("");
    }
    $('.notificationContent').text(currentNotif.content);
}


function loadDB()
{
    for(var i= 0; i < notificationDB.length; i++)
    {
        var notif= new Notification(notificationDB[i][0],notificationDB[i][1],notificationDB[i][2])
        notificationArray.push({notification:notif , used:0});
    }
}

function fillAllNotif()
{
    for(var i=0; i<notificationArray.length; i++)
    {
        $('#allNotif').append(htmlFromNotif(notificationArray[i].notification));
    }
}

function htmlFromNotif(notif)
{
    var htmlDisplay = "<div class=\"singleNotification\"><div class=\"sourceApp\">" + notif.sourceApp + "</div><div class=\"sender\">" + notif.sender + "</div><div class=\"notificationContent\">" + notif.content + "</div></div>";
    console.log(htmlDisplay);
    return htmlDisplay;
}

var notificationDB = [
    ["Messenger", "John", "Want to hang out tonight ?"],
    ["Messenger", "Clark", "Hey ! we should meet for the INF5261 project !"],
    ["Messenger", "Clara", "Hi, shall we go to cinema this evening ?"],
    ["Messenger", "Mike", "Men ! Kim felt down the stairs !"]

];