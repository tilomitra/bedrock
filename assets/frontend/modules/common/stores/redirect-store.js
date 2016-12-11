var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../../action-types')


module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({});
    },

    initialize() {
        
    }
});



/**
 * @param {string} routeName
 */
function redirectTo(routeName, params) {

    // return a function which receives arbitrary
    // arguments, but ignores them and only ever
    // returns a routeName
    var timeStamp = new Date().getTime();
    return toImmutable({
        path: routeName + '@' + timeStamp
    });
}
