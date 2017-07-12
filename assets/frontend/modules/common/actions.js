var nuclear = require("../../reactor");
var actionTypes = require("../action-types");
import api from "../../api";

/* Mission and Tagline */

exports.updateMission = data => {
    nuclear.dispatch(actionTypes.UPDATE_MISSION, { data });
};
exports.updateTagline = data => {
    nuclear.dispatch(actionTypes.UPDATE_TAGLINE, { data });
};

/* Achievements */

exports.addAchievement = () => {
    nuclear.dispatch(actionTypes.ADD_ACHIEVEMENT);
};

exports.removeAchievement = index => {
    nuclear.dispatch(actionTypes.REMOVE_ACHIEVEMENT, { index });
};

exports.updateAchievement = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_ACHIEVEMENT, { index, attr, value });
};

/* Milestones */

exports.addMilestone = () => {
    nuclear.dispatch(actionTypes.ADD_MILESTONE);
};

exports.removeMilestone = index => {
    nuclear.dispatch(actionTypes.REMOVE_MILESTONE, { index });
};

exports.updateMilestone = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_MILESTONE, { index, attr, value });
};

/* API Methods */

exports.publish = (data, markup) => {
    api
        .publish(data, markup, "https://miller-furniture.myshopify.com")
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });
};
