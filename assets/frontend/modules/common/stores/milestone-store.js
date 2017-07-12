var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        /*
            description: PropTypes.string,
            amount: PropTypes.number,
            type: PropTypes.oneOf(["stars", "count"])
            includePlus
        */
        return toImmutable([
            {
                description: "Locations Around North America",
                amount: 5,
                includePlus: false,
                type: "count"
            }
        ]);
    },

    initialize() {
        this.on(actionTypes.UPDATE_MILESTONE, handleUpdate);
        this.on(actionTypes.ADD_MILESTONE, handleAdd);
        this.on(actionTypes.REMOVE_MILESTONE, handleRemove);
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
            description: undefined,
            amount: 0,
            includePlus: true,
            type: "count"
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
