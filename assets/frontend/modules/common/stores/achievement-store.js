var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable([
            {
                name: "A Sample Achievement",
                publicationName: "Conde Nast",
                publishLink: "https://presskitty.ca",
                imageUrl:
                    "http://www.adweek.com/wp-content/uploads/sites/9/2015/06/CondeNast304x200.jpg",
                type: "feature"
            }
        ]);
    },

    initialize() {
        this.on(actionTypes.UPDATE_ACHIEVEMENT, handleUpdate);
        this.on(actionTypes.ADD_ACHIEVEMENT, handleAdd);
        this.on(actionTypes.REMOVE_ACHIEVEMENT, handleRemove);
        this.on(
            actionTypes.SAVE_ACHIEVEMENTS_SUCCESS,
            handleFetchAndSaveSuccess
        );
        this.on(
            actionTypes.FETCH_ACHIEVEMENTS_SUCCESS,
            handleFetchAndSaveSuccess
        );
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

function handleFetchAndSaveSuccess(state, payload) {
    return toImmutable(payload.data);
}
