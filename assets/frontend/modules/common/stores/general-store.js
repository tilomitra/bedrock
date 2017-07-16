var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            publishedPage: null
        });
    },

    initialize() {
        this.on(actionTypes.PUBLISH_SUCCESS, handlePublishSuccess);
    }
});

/**
 * Function to process an incoming payload from the server and store it
 * in the nuclear-js store. Entity represents a sails.js blueprint resource.
 * It takes a normal JS object or array and makes it immutable.
 * payload.data
 * payload.entity
 * @param {Immutable.Map} state
 * @param {object} payload
 */
function handlePublishSuccess(state, payload) {
    let newState = state.set("publishedPage", toImmutable(payload.data));
    return newState;
}
