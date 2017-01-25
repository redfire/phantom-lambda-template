var phantomjs = require('phantomjs-prebuilt');

exports.handler = function(event, context, callback) {
    var enabled_domains = [];
    enabled_domains.push("goneout.nl");
    enabled_domains.push("www.goneout.nl");
    enabled_domains.push("coachgezocht.nu");
    enabled_domains.push("www.coachgezocht.nu");

    var url = event.url;
    var domain = extractDomain(url);
    var is_allowed = false;
    for(var i in enabled_domains) {
        if(enabled_domains[i] == domain) {
            is_allowed = true;
            break;
        }
    }
    if(!is_allowed) {
        callback(null, "Action not allowed");
        return;
    }

    var phantom = phantomjs.exec('phantomjs-script.js', 'https://coachgezocht.nu');
    phantom.buffer = '';
    phantom.stdout.on('data', function(buf) {
        phantom.buffer += String(buf);
        //console.log('[STR] stdout "%s"', String(buf));
    });
    phantom.stderr.on('data', function(buf) {
        //console.log('[STR] stderr "%s"', String(buf));
    });
    phantom.on('close', function(code) {
        //console.log('[END] code', code);
    });

    phantom.on('exit', function(code) {
        //console.log(this.buffer);
        context.succeed(phantom.buffer);
    });

};

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}