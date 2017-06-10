import Types from "../constants/action-types";

module.exports = {
    incrementCounter: () => {
        return { type: Types.INCREMENT_COUNTER };
    },
    decrementCounter: () => {
        return { type: Types.DECREMENT_COUNTER };
    }
};
