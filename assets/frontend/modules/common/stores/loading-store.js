var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../../action-types')
module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({});
    },

    initialize() {
        this.on(actionTypes.ENTITY_FETCH_START, loadingForEntity(true));
        this.on(actionTypes.ENTITY_FETCH_SUCCESS, loadingForEntity(false));
        this.on(actionTypes.ENTITY_FETCH_FAIL, loadingForEntity(false));

    }
});


function loadingForEntity(isLoading) {

    return (state, {entity, data}) => {
        var newState = state.withMutations(state => {
            state.setIn([entity], isLoading)
        });
        return newState;
    }
}


/**
 * @param {string} routeName
 */
function loadingFor(action, isLoading) {

    // return a function which receives arbitrary
    // arguments, but ignores them and only ever
    // returns a routeName
    return (state, data) => {
        var newState = state.withMutations(state => {
            state.setIn([action], isLoading)
        });

        return newState;
    }
}

/**
 * @param {string} routeName
 */
function loadingDataFor(action, isLoading) {

    return (state, data) => {
        var newState = state.withMutations(state => {
            state.setIn([action], { status: isLoading, data: data })
        });

        return newState;
    }
}
