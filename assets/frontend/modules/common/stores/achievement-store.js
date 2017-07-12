var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable([
            {
                name: undefined,
                publicationName: undefined,
                publishLink: undefined,
                imageUrl: undefined,
                type: undefined
            }
        ]);
    },

    initialize() {
        this.on(actionTypes.UPDATE_ACHIEVEMENT, handleUpdate);
        this.on(actionTypes.ADD_ACHIEVEMENT, handleAdd);
        this.on(actionTypes.REMOVE_ACHIEVEMENT, handleRemove);
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
function handleAdd(state, payload) {
    return state.push(
        toImmutable({
            name: undefined,
            publicationName: undefined,
            publishLink: undefined,
            imageUrl: undefined,
            type: undefined
        })
    );
}

function handleRemove(state, payload) {
    return state.delete(payload.index);
}

function handleUpdate(state, payload) {
    let data = state.get(payload.index);
    data = data.set(payload.attr, payload.value);
    return state.set(payload.index, data);
}
