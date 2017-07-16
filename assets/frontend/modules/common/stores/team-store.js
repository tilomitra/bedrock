var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable([
            {
                name: "John Smith",
                position: "Founder",
                description:
                    "When I'm not in the office, you can find me surfing the waves on the Pacific.",
                email: "johnsmith@me.com",
                imageUrl:
                    "https://images.unsplash.com/photo-1490923574825-95e44b2d7242?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop="
            }
        ]);
    },

    initialize() {
        this.on(actionTypes.UPDATE_TEAM, handleUpdate);
        this.on(actionTypes.ADD_TEAM, handleAdd);
        this.on(actionTypes.REMOVE_TEAM, handleRemove);
        this.on(actionTypes.SAVE_TEAMS_SUCCESS, handleFetchAndSaveSuccess);
        this.on(actionTypes.FETCH_TEAMS_SUCCESS, handleFetchAndSaveSuccess);
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
            position: undefined,
            description: undefined,
            email: undefined,
            imageUrl: undefined
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
