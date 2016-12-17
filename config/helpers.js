var Handlebars = require('handlebars');

// -- Helpers ------------------------------------------------------------------
module.exports = {
    getFlashObj: function (messages, entry, key) {
        var arr = messages[entry];
        var obj = {};
        if (arr && arr.length) {
            obj = arr[0];
        }
        return obj[key] || '';
    },

    setTitle: function (title) {
        this.title = title;
    },

    printFlash: function (messages) {

        var output = [];

        var messages = messages || {};

        var extractMessages = function(obj) {
            var messages = [];
            if (obj.message) return [obj.message];

            Object.keys(obj).forEach(function(key) {

                if (obj[key].length && typeof obj[key] === "object") {
                    obj[key].forEach(function(item) {
                        if (item.message) {
                            messages.push(item.message);
                        }
                    });
                } else {
                    messages.push(obj[key]);
                }
            });

            return messages;
        }
        var classForType = function(type) {
            if (type === 'error') {
                return 'warning';
            }
            if (type === 'success') {
                return 'positive';
            }

            return '';
        };
        var validTypes = ['error', 'success', 'info'];

        Object.keys(messages).forEach(function(messageType) {
            if (validTypes.indexOf(messageType) > -1) {
                messages[messageType].forEach(function(message) {
                    if (typeof(message) === 'object') {
                        var full = '<div class="ui message ' + classForType(messageType) + '">';
                        extractMessages(message).forEach(function(msg) {
                            full += '<p>' + msg + '</p>';
                        });
                        full += '</div>';
                        output.push(full);
                    } else {
                        output.push('<div class="ui message ' + classForType(messageType) + '"><p>' + message + '</p></div>');
                    }
                });
            }
        });

        output = output.join('\n');

        return new Handlebars.SafeString(output);
    }
}