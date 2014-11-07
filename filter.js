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
            $('#filteredNotif').append(htmlFromNotif(notificationArray[i].notification));
        }
    }
}

function initializeFilter()
{

}

function filter(notif, cont)
{
    return 1;
}