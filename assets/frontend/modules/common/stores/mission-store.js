var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            title: "Hello, We are Miller",
            tagline: "Test Tagline",
            isSaved: false
        });
    },

    initialize() {
        this.on(actionTypes.UPDATE_MISSION, handleMissionUpdate);
        this.on(actionTypes.UPDATE_TAGLINE, handleTaglineUpdate);
        this.on(actionTypes.SAVE_MISSIONS_SUCCESS, handleSaveSuccess);
        this.on(actionTypes.FETCH_MISSIONS_SUCCESS, handleFetchSuccess);
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
    let newState = state.set("title", payload.data);
    newState = newState.set("isSaved", false);
    return newState;
}

function handleTaglineUpdate(state, payload) {
    let newState = state.set("tagline", payload.data);
    newState = newState.set("isSaved", false);
    return newState;
}

function handleFetchSuccess(state, payload) {
    if (payload.data[0]) {
        let newState = state.set("title", payload.data[0].title);
        newState = newState.set("tagline", payload.data[0].subtitle);
        newState = newState.set("isSaved", true);
        return newState;
    } else {
        return state;
    }
}

function handleSaveSuccess(state, payload) {
    let newState = state.set("title", payload.data.title);
    newState = newState.set("tagline", payload.data.subtitle);
    newState = newState.set("isSaved", true);
    return newState;
}
