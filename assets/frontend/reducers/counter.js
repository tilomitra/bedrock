import Types from "../constants/action-types";

const initialState = {
    value: 0
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case Types.INCREMENT_COUNTER: {
            return {
                value: state.value + 1
            };
        }
        case Types.DECREMENT_COUNTER: {
            return {
                value: state.value - 1
            };
        }
        default:
            return state;
    }
}
