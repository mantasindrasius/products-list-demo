var http = require('http');
var Promise = require('promise');
var events = require('events');
var url = require('url');

var httpClient = new function() {
    var pendingRequests = 0;
    var eventEmitter = new events.EventEmitter();

    this.get = function(url) {
        pendingRequests++;

        return new Promise(function(fulfill, reject) {
            http.get(url, wrap(fulfill))
                .on('error', wrap(reject));
        });
    };

    this.put = function(postUrl, data) {
        return this._postData('PUT', postUrl, data);
    };

    this.post = function(postUrl, data) {
        return this._postData('POST', postUrl, data);
    };

    this.on = function(event, callback) {
        eventEmitter.on(event, callback);
    };

    this._postData = function(method, postUrl, data) {
        pendingRequests++;

        var postData = JSON.stringify(data);
        var options = url.parse(postUrl);

        options.method = method;
        options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        };

        return new Promise(function(fulfill, reject) {
            var req = http.request(options);

            req.on('response', wrap(fulfill));
            req.on('error', wrap(reject));

            req.write(postData);
            req.end();
        });
    };

    function wrap(f) {
        return function() {
            try {
                f.apply(this, arguments);
            } finally {
                if (--pendingRequests === 0) {
                    eventEmitter.emit('no-more-pending')
                }
            }
        }
    }
};

module.exports = {
    client: httpClient
};
