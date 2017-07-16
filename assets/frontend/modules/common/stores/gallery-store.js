var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable([
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1485011062108-85580cbb0d3e?dpr=2&auto=compress,format&fit=crop&w=376&h=282&q=80&cs=tinysrgb&crop=",
                caption: "Notebook and Phone"
            }
        ]);
    },

    initialize() {
        this.on(actionTypes.UPDATE_IMAGE, handleUpdate);
        this.on(actionTypes.ADD_IMAGE, handleAdd);
        this.on(actionTypes.REMOVE_IMAGE, handleRemove);
        this.on(actionTypes.FETCH_IMAGES_SUCCESS, handleFetchAndSaveSuccess);
        this.on(actionTypes.SAVE_IMAGES_SUCCESS, handleFetchAndSaveSuccess);
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
            imageUrl: undefined,
            caption: undefined
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

function handleFetchAndSaveSuccess(state, payload) {
    return toImmutable(payload.data);
}
