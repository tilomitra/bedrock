var Nuclear = require("nuclear-js");
var toImmutable = Nuclear.toImmutable;
var actionTypes = require("../../action-types");

module.exports = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            html: `
            <h3>Quaesita enim virtus est, non quae relinqueret naturam, sed quae tueretur.</h3>
            <p>Refert tamen, quo modo. Duo enim genera quae erant, fecit tria. Qualem igitur hominem natura inchoavit? Sed in rebus apertissimis nimium longi sumus. Ubi ut eam caperet aut quando? Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Ut in voluptate sit, qui epuletur, in dolore, qui torqueatur. Ad eos igitur converte te, quaeso. Non autem hoc: igitur ne illud quidem.</p>
            <ol>
            <li>Multoque hoc melius nos veriusque quam Stoici.</li>
            <li>Alia quaedam dicent, credo, magna antiquorum esse peccata, quae ille veri investigandi cupidus nullo modo ferre potuerit.</li>
            <li>Non igitur de improbo, sed de callido improbo quaerimus, qualis Q.</li>
            </ol>
            
            `
        });
    },

    initialize() {
        this.on(actionTypes.UPDATE_ABOUT, handleUpdate);
        this.on(actionTypes.SAVE_ABOUTS_SUCCESS, handleSaveSuccess);
        this.on(actionTypes.FETCH_ABOUTS_SUCCESS, handleFetchSuccess);
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
function handleUpdate(state, payload) {
    return state.set("html", payload.data);
}

function handleFetchSuccess(state, payload) {
    if (payload.data[0]) {
        let newState = state.set("html", payload.data[0].html);
        newState = newState.set("isSaved", true);
        return newState;
    } else return state;
}

function handleSaveSuccess(state, payload) {
    let newState = state.set("html", payload.data.html);
    newState = newState.set("isSaved", true);
    return newState;
}
