/**
 * Created by Bastien on 07/11/2014.
 */

var historic = {};
var filteredNotification={};
var contexts=[];
var currentContext;

function refreshFilter()
{
    while (filteredNotification.length)
    {
        filteredNotification.pop();
    }

    $('#filteredNotif').text("");

    initializeFilter();

    console.log(filteredNotification);

    currentContext = $('#contextSelection').find(":selected").text();

    refreshDisplay();
    refreshNotifAmount();
}

function initializeFilter()
{

    inputArray.forEach(function(n) {
        if(historic[n.context] == undefined) {
            historic[n.context] = {};
            historic[n.context]['apps'] = {};
            historic[n.context]['sender'] = {};
        }
        if(historic[n.context][n.notification.sourceApp] == undefined) {
            historic[n.context][n.notification.sourceApp] = {};
        }
        if(historic[n.context]['apps'][n.notification.sourceApp] == undefined) {
            historic[n.context]['apps'][n.notification.sourceApp] = [];
        }
        if(historic[n.context]['sender'][n.notification.sender] == undefined) {
            historic[n.context]['sender'][n.notification.sender] = [];
        }

        historic[n.context][n.notification.sourceApp][n.notification.sender] = n.result;
        historic[n.context]['apps'][n.notification.sourceApp].push(n.result);
        historic[n.context]['sender'][n.notification.sender].push(n.result);
    });

    console.log(contexts);

    contexts.forEach(function (context) {
        // we create an entry for the context
        filteredNotification[context] = [];

        // foreach notification
        notificationArray.forEach(function(n) {


            // if we have a previous notification that have been granted, we add it to the list
            if(historic[context] != undefined && historic[context][n.sourceApp] != undefined && historic[context][n.sourceApp][n.sender] != undefined) {
                console.log("found:");
                console.log(n);
                if(historic[context][n.sourceApp][n.sender] === 1) {
                    filteredNotification[context].push(n);
                }
                // else we have to start guessing if the user want to receive it or not
            } else {
                if(historic[context] != undefined && historic[context]['sender'] != undefined && historic[context]['sender'][n.notification.sender] != undefined) {
                    if(f(context, n.sender)) {
                        filteredNotification[context].push(n);
                    }
                    // if we don't have enough data for this context, we look at other contexts
                } else {
                    var rate = 0;

                    console.log(n.sender + " msg on context " + context);

                    contexts.forEach(function (c) {
                        rate += f(c, n.sender);
                    });

                    if(rate >= 0) {
                        filteredNotification[context].push(n);
                    }
                }
            }
        });
    });

}

function f(context, sender) {
    if(historic[context] != undefined && historic[context]['sender'] != undefined && historic[context]['sender'][sender] != undefined) {
        var sum = 0;
        historic[context]['sender'][sender].forEach(function (e) {
            if (e == 0) {
                sum--;
            } else {
                sum++;
            }
        });
        return sum;
    } else {
        return 0;
    }
}

function refreshDisplay()
{
    for(var i=0; i<filteredNotification[currentContext].length; i++)
    {
        $('#filteredNotif').append(htmlFromNotif(filteredNotification[currentContext][i].notification));
    }
}

function refreshNotifAmount()
{
    $('#allNotifAmount').text(notificationArray.length);
    $('#filterNotifAmount').text(filteredNotification[currentContext].length);
}

function loadContextList()
{

    while (contexts.length)
    {
        contexts.pop();
    }

    $("#contextSelection option").each(function()
    {
        contexts.push($(this).val());
        //add $(this).val() to your list
    });

}