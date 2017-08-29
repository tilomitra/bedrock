var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({ count: 1 });
    },

    initialize() {
        this.on(actionTypes.INCREASE, function(state, msg) {
            return state.set("count", state.get("count") + 1);
        });
        this.on(actionTypes.DECREASE, function(state, msg) {
            return state.set("count", state.get("count") - 1);
        });
    }
});
