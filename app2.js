var notifications = [{sourceApp:"Messenger",sender:"Clark",content:"Hey ! we should meet for the INF5261 project !"},{sourceApp:"Messenger",sender:"John",content:"Want to hang out tonight ?"},{sourceApp:"Messenger",sender:"Mike",content:"Men ! Kim felt down the stairs !"},{sourceApp:"Messenger",sender:"Clara",content:"Hi, shall we go to cinema this evening ?"}];
var notifications_saved = [{"notification":{"sourceApp":"Messenger","sender":"Clark","content":"Hey ! we should meet for the INF5261 project !"},"context":"Home","result":1},{"notification":{"sourceApp":"Messenger","sender":"John","content":"Want to hang out tonight ?"},"context":"Home","result":1},{"notification":{"sourceApp":"Messenger","sender":"Mike","content":"Men ! Kim felt down the stairs !"},"context":"Home","result":0},{"notification":{"sourceApp":"Messenger","sender":"Clara","content":"Hi, shall we go to cinema this evening ?"},"context":"Home","result":1}];
var contexts = ["home", "work", "transport"];

var notifications_filtered = {};
var historic = {};

notifications_saved.forEach(function(n) {
    console.log(n.context);
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
    notifications_filtered[context] = [];
    notifications.forEach(function(n) {
        if(historic[context] != undefined && historic[context][n.sourceApp] != undefined && historic[context][n.sourceApp][n.sender] != undefined) {
            if(historic[context][n.sourceApp][n.sender] === 1) {
                notifications_filtered[context].push(n);
            }
        } else {
            // start doing smart things here
        }
    });
});

