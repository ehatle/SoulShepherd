var notifications = [{sourceApp:"Messenger",sender:"Clark",content:"Hey ! we should meet for the INF5261 project !"},{sourceApp:"Messenger",sender:"John",content:"Want to hang out tonight ?"},{sourceApp:"Messenger",sender:"Mike",content:"Men ! Kim felt down the stairs !"},{sourceApp:"Messenger",sender:"Clara",content:"Hi, shall we go to cinema this evening ?"}];
var notifications_saved = [{"notification":{"sourceApp":"Messenger","sender":"Clark","content":"Hey ! we should meet for the INF5261 project !"},"context":"Home","result":1},{"notification":{"sourceApp":"Messenger","sender":"John","content":"Want to hang out tonight ?"},"context":"Home","result":1},{"notification":{"sourceApp":"Messenger","sender":"Mike","content":"Men ! Kim felt down the stairs !"},"context":"Home","result":0},{"notification":{"sourceApp":"Messenger","sender":"Clara","content":"Hi, shall we go to cinema this evening ?"},"context":"Home","result":1}];
var contexts = ["Home", "Work", "Transport"];

var notifications_filtered = {};
var historic = {};

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


notifications_saved.forEach(function(n) {
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

contexts.forEach(function (context) {
    // we create an entry for the context
    notifications_filtered[context] = [];

    // foreach notification
    notifications.forEach(function(n) {
        // if we have a previous notification that have been granted, we add it to the list
        if(historic[context] != undefined && historic[context][n.sourceApp] != undefined && historic[context][n.sourceApp][n.sender] != undefined) {
            if(historic[context][n.sourceApp][n.sender] === 1) {
                notifications_filtered[context].push(n);
            }
        // else we have to start guessing if the user want to receive it or not
        } else {
            if(historic[context] != undefined && historic[n.context]['sender'] != undefined && historic[n.context]['sender'][n.notification.sender] != undefined) {
                if(f(n.context, n.sender)) {
                    notifications_filtered[context].push(n);
                }
            // if we don't have enough data for this context, we look at other contexts
            } else {
                var rate = 0;

                console.log(n.sender + " msg on context " + context);

                contexts.forEach(function (c) {
                    rate += f(c, n.sender);
                });

                if(rate >= 0) {
                    notifications_filtered[context].push(n);
                }
            }
        }
    });
});

console.log(notifications_filtered);

