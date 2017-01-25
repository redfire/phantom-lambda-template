var system = require('system');

if (system.args.length < 2) {
    console.log("Missing arguments.");
    phantom.exit();
}

var page = require('webpage').create();
page.settings.loadImages = false;
page.settings.localToRemoteUrlAccessEnabled = true;
page.settings.resourceTimeout = 30000;
page.onCallback = function() {
    //console.log('callback');
    console.log(page.content);
    page.close();
    phantom.exit();
};
page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};
page.onInitialized = function() {
    //console.log('onInitialized');
    page.evaluate(function() {
        setTimeout(function() {
            //console.log('calling home');
            window.callPhantom();
        }, 15000);
    });
};

page.open(system.args[1], function(status) {
    //console.log('status: ' + status);
});