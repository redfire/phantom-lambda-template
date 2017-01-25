
var AWS = require('aws-sdk');
var phantomjs = require('phantomjs-prebuilt');

exports.handler = function(event, context, callback) {
    var phantom = phantomjs.exec('phantomjs-script.js', 'arg1', 'arg2');
    phantom.buffer = '';
    phantom.stdout.on('data', function(buf) {
        this.buffer += String(buf);
        console.log('[STR] stdout "%s"', String(buf));
    });
    phantom.stderr.on('data', function(buf) {
        console.log('[STR] stderr "%s"', String(buf));
    });
    phantom.on('close', function(code) {
        console.log('[END] code', code);
    });

    phantom.on('exit', code => {
        callback(null, phantom.buffer);
    });

};