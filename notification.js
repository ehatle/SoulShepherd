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
    return htmlDisplay;
}

var notificationDB = [
    ["Messenger", "John (friend)", "HEEEEEEEEEYEYZZZ ! WAZZZZZZZUP ! dfgh"],
    ["Messenger", "Clark (friend)", "Hey ! How are you ? Last night was an hell of a party !"],
    ["Messenger", "Mike (friend)", "Hey ! we should meet for the INF5261 project !"],
    ["Messenger", "Clara (aunt)", "Hi sweety ! Are you coming at Granny's this week-end ?"],
    ["Messenger", "Alex (SO)", "Hey ;) You want to go to the theatre this evening ?"],
    ["Messenger", "Bob (colleague)", "Hello ? Are you here ? Why don't you answer my emails !"],

    ["Apps", "SnapChat", "You have 3 new Snaps waiting"],
    ["Apps", "SnapChat", "Alex sent you a Snap"],
    ["Apps", "CandyCrush", "It's been a long time since last time ! Come back and play !"],
    ["Apps", "CandyCrush", "Clark sent you a new life"],
    ["Apps", "Twitter", "Top trends of the week"],
    ["Apps", "Twitter", "3 people retweeted you"],

    ["Facebook", "Clark (friend)", "Clark tagged you in 15 new photos"],
    ["Facebook", "Mike (friend)", "Mike added you to the group INF5261-Project"],
    ["Facebook", "Clark (friend)", "Clark invited you to the event Jen-Birthday"],
    ["Facebook", "Alex (SO)", "Alex posted a link on your timeline"],
    ["Facebook", "John (friend)", "John and you are now friends"],


    ["SMS", "Mom", "Uncle Joe is at the hospital ! Call me now"],
    ["SMS", "Mom", "Could you buy some eggs on the way back ?"],
    ["SMS", "Alex (SO)", "Miss you ! See you this evening"],
    ["SMS", "Alex (SO)", "Did you remembered to book the theatre ?"],
    ["SMS", "John (friend)", "Oooh maaan ! I'm soooo wazted righht noww !"],
    ["SMS", "Clara (aunt)", "My train arrives at 7. I will be at Grandma around 9"],

    ["eMail", "Bob (colleague)", "About the new feature for the project, how should we proceed ?"],
    ["eMail", "Mark (boss)", "Meeting tomorrow at 10"],
    ["eMail", "Clark (friend)", "Hi dude. Jen is doing a birthday party next week, you want to come ?"],
    ["eMail", "Mom", "Hi sweetheart. I booked the plane tickets for your trip to NY next month"],
    ["eMail", "LinkedIn", "You have a new relation pending : (old classmate)"],
    ["eMail", "Mike (friend)", "Lenny will be late for the group presentation"],
    ["eMail", "Marketing company", "Buy Our products ! Now !"],
    

];