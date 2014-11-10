/**
 * Created by Bastien on 07/11/2014.
 */

var historic = {};
var filteredNotification={};
var contexts=[];
var currentContext;


var finalList=[];


function refreshFilter()
{
    while (filteredNotification.length)
    {
        filteredNotification.pop();
    }
    while (finalList.length)
    {
        finalList.pop();
    }

    $('#filteredNotif').text("");
    currentContext = $('#contextSelection').find(":selected").text();

    initializeFilter();
    console.log(historic);

    //applyAllFilter();
    //console.log(filteredNotification);

    for(var i=0; i<notificationArray.length; i++)
    {
        if(filter(currentContext, notificationArray[i].notification)==1)
        {
            finalList.push(notificationArray[i].notification);
        }
    }

//   for(var i=0; i<filteredNotification[currentContext].length; i++)
//   {
//        finalList.push(filteredNotification[currentContext][i]);
//    }

    refreshDisplay();
    refreshNotifAmount();
}




function initializeFilter() {

    inputArray.forEach(function (n) {
        if (historic[n.context] == undefined) {
            historic[n.context] = {};
            historic[n.context]['apps'] = {};
            historic[n.context]['sender'] = {};
        }
        if (historic[n.context][n.notification.sourceApp] == undefined) {
            historic[n.context][n.notification.sourceApp] = {};
        }
        if (historic[n.context]['apps'][n.notification.sourceApp] == undefined) {
            historic[n.context]['apps'][n.notification.sourceApp] = [];
        }
        if (historic[n.context]['sender'][n.notification.sender] == undefined) {
            historic[n.context]['sender'][n.notification.sender] = [];
        }

        historic[n.context][n.notification.sourceApp][n.notification.sender] = n.result;
        historic[n.context]['apps'][n.notification.sourceApp].push(n.result);
        historic[n.context]['sender'][n.notification.sender].push(n.result);
    });

}

function applyAllFilter()
{
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

function filter(context, notification)
{

    if(historic[context] != undefined && historic[context][notification.sourceApp] != undefined && historic[context][notification.sourceApp][notification.sender] != undefined)
    {
        console.log("Perfect match found : " + JSON.stringify(notification));
        return historic[context][notification.sourceApp][notification.sender];
    }

    var appPro=0;
    var appCon=0;
    var sendPro=0;
    var sendCon=0;

    if(historic[context] != undefined && historic[context][notification.sourceApp] != undefined)
    {
        for(var i=0; i<historic[context][notification.sourceApp].length; i++)
        {
            if(historic[context][notification.sourceApp][i]==1)
            {
                appPro++;
            }
            else
            {
                appCon++;
            }
        }
    }

    if(historic[context] != undefined && historic[context][notification.sender] != undefined)
    {
        for(var i=0; i<historic[context][notification.sender].length; i++)
        {
            if(historic[context][notification.sender][i]==1)
            {
                sendPro++;
            }
            else
            {
                sendCon++;
            }
        }
    }

    if( (appPro-appCon)*(appPro+appCon) + (sendPro-sendCon)*(sendCon+sendCon) >= 0)
    {
        return 1;
    }
    else
    {
        return 0;
    }

}


function refreshDisplay()
{
    for(var i=0; i<finalList.length; i++)
    {
        $('#filteredNotif').append(htmlFromNotif(finalList[i]));
    }
}

function refreshNotifAmount()
{
    $('#allNotifAmount').text(notificationArray.length);
    if(filteredNotification[currentContext])
    {
        $('#filterNotifAmount').text(filteredNotification[currentContext].length);
    }
    else
    {
        $('#filterNotifAmount').text("0");
    }

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