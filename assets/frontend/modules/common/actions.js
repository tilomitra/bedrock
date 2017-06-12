import reactor from "../../reactor";
import ActionTypes from "../action-types";

const Actions = {
    incrementCounter: () => {
        reactor.dispatch(ActionTypes.INCREMENT_COUNTER);
    },

    decrementCounter: () => {
        reactor.dispatch(ActionTypes.DECREMENT_COUNTER);
    }
};

export default Actions;
