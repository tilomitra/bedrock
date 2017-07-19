var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            publishedPage: null,
            isSaved: true
        });
    },

    initialize() {
        const saveActions = [
            actionTypes.UPDATE_ABOUT,
            actionTypes.UPDATE_MISSION,
            actionTypes.UPDATE_TAGLINE,
            actionTypes.ADD_ACHIEVEMENT,
            actionTypes.REMOVE_ACHIEVEMENT,
            actionTypes.UPDATE_ACHIEVEMENT,
            actionTypes.ADD_MILESTONE,
            actionTypes.REMOVE_MILESTONE,
            actionTypes.UPDATE_MILESTONE,
            actionTypes.ADD_IMAGE,
            actionTypes.REMOVE_IMAGE,
            actionTypes.UPDATE_IMAGE,
            actionTypes.ADD_TEAM,
            actionTypes.REMOVE_TEAM,
            actionTypes.UPDATE_TEAM
        ];

        this.on(actionTypes.PUBLISH_SUCCESS, handlePublishSuccess);

        saveActions.forEach(at => {
            this.on(at, updateSaveFalse);
        });
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
    newState = newState.set("isSaved", true);
    return newState;
}

function updateSaveFalse(state, payload) {
    return state.set("isSaved", false);
}
