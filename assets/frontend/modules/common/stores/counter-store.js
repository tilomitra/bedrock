import Nuclear from "nuclear-js";
import ActionTypes from "../../action-types";

const toImmutable = Nuclear.toImmutable;

const CounterStore = new Nuclear.Store({
    getInitialState() {
        return toImmutable({
            value: 0
        });
    },

    initialize() {
        this.on(ActionTypes.INCREMENT_COUNTER, incrementCounter);
        this.on(ActionTypes.DECREMENT_COUNTER, decrementCounter);
    }
});

function incrementCounter(state, payload) {
    var val = state.get("value");
    return state.set("value", val + 1);
}

function decrementCounter(state, payload) {
    return state.set("value", state.get("value") - 1);
}

export default CounterStore;
