/**
 * Created by Bastien on 07/11/2014.
 */

var filteredNotification=[];

function refreshFilter()
{
    while (filteredNotification.length)
    {
        filteredNotification.pop();
    }

    $('#filteredNotif').text("");

    initializeFilter();

    for(var i=0; i<notificationArray.length; i++)
    {
        if(filter(notificationArray[i].notification, $('#contextSelection').find(":selected").text() ) === 1)
        {
            filteredNotification.push((notificationArray[i].notification));
        }
    }

    refreshDisplay();
    refreshNotifAmount();
}

function initializeFilter()
{

}

function filter(notif, context)
{
    return 1;
}

function refreshDisplay()
{
    for(var i=0; i<filteredNotification.length; i++)
    {
        $('#filteredNotif').append(htmlFromNotif(filteredNotification[i]));
    }
}

function refreshNotifAmount()
{
    $('#allNotifAmount').text(notificationArray.length);
    $('#filterNotifAmount').text(filteredNotification.length);
}