var _ = require("underscore");
var rp = require("request-promise");

var WINDOW_EXISTS = typeof window !== "undefined";
var baseUrl = WINDOW_EXISTS
    ? window.location.protocol + "//" + window.location.host
    : "http://localhost:1337";

function transformResp(body, response) {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
}

function makeRequest(url, options, qs) {
    options = options || {};
    qs = qs || {};
    //qs.staging = localStorage.getItem('staging') == "true";
    var opts = _.extend(
        {
            headers: {},
            uri: baseUrl + "/api" + url,
            qs: qs,
            transform: transformResp
        },
        options
    );
    return rp(opts);
}

module.exports = {
    publish: function(data, markup, css, storeName) {
        return makeRequest("/publish", {
            method: "POST",
            body: { data: data, markup: markup, css: css },
            qs: { storeName: storeName },
            json: true
        });
    },

    fetch: function(entity, storeId = 8) {
        return makeRequest(`/${entity}?storeId=${storeId}`, {
            json: true,
            headers: {
                nonce:
                    document.getElementById("nonce").text ||
                    "c30ed4c7-c521-4869-9f3a-6b3caafd958e"
            }
        });
    },

    refresh: function(entity, data) {
        return makeRequest(`/${entity}/refresh`, {
            method: "POST",
            body: data,
            json: true,
            headers: {
                nonce:
                    document.getElementById("nonce").text ||
                    "c30ed4c7-c521-4869-9f3a-6b3caafd958e"
            }
        });
    }
};
