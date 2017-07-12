var nuclear = require("../../reactor");
var actionTypes = require("../action-types");

exports.updateMission = data => {
    nuclear.dispatch(actionTypes.UPDATE_MISSION, { data });
};
exports.updateTagline = data => {
    nuclear.dispatch(actionTypes.UPDATE_TAGLINE, { data });
};

exports.addAchievement = () => {
    nuclear.dispatch(actionTypes.ADD_ACHIEVEMENT);
};

exports.removeAchievement = index => {
    nuclear.dispatch(actionTypes.REMOVE_ACHIEVEMENT, { index });
};

exports.updateAchievement = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_ACHIEVEMENT, { index, attr, value });
};
