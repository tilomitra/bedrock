var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            title: "Hello, We are Miller",
            tagline: "Test Tagline"
        });
    },

    initialize() {
        this.on(actionTypes.UPDATE_MISSION, handleMissionUpdate);
        this.on(actionTypes.UPDATE_TAGLINE, handleTaglineUpdate);
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
function handleMissionUpdate(state, payload) {
    return state.set("title", payload.data);
}

function handleTaglineUpdate(state, payload) {
    return state.set("tagline", payload.data);
}
