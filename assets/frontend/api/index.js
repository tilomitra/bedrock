var _ = require('underscore');
var rp = require('request-promise');

var WINDOW_EXISTS = (typeof window !== 'undefined');
var baseUrl = (WINDOW_EXISTS) ? window.location.protocol + '//' + window.location.host : 'http://localhost:9444';

function transformResp(body, response) {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
}

module.exports = {

    makeRequest: function(url, options, qs) {
        options = options || {};
        qs = qs || {};
        //qs.staging = localStorage.getItem('staging') == "true";
        var opts = _.extend({
            headers: {},
            uri: baseUrl + '/api' + url,
            qs: qs,
            transform: transformResp
        }, options);
        return rp(opts);
    },

};
