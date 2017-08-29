var nuclear = require("../../reactor");
var actionTypes = require("../action-types");

module.exports = {
    increase: () => {
        nuclear.dispatch(actionTypes.INCREASE, {});
    },
    decrease: () => {
        nuclear.dispatch(actionTypes.DECREASE, {});
    }
};
