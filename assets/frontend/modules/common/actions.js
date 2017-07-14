var nuclear = require("../../reactor");
var actionTypes = require("../action-types");
import api from "../../api";

/* About */

exports.updateAbout = data => {
    nuclear.dispatch(actionTypes.UPDATE_ABOUT, { data });
};

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

/* Gallery */

exports.addGallery = () => {
    nuclear.dispatch(actionTypes.ADD_GALLERY);
};

exports.removeGallery = index => {
    nuclear.dispatch(actionTypes.REMOVE_GALLERY, { index });
};

exports.updateGallery = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_GALLERY, { index, attr, value });
};

/* TEam */

exports.addTeam = () => {
    nuclear.dispatch(actionTypes.ADD_TEAM);
};

exports.removeTeam = index => {
    nuclear.dispatch(actionTypes.REMOVE_TEAM, { index });
};

exports.updateTeam = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_TEAM, { index, attr, value });
};

/* API Methods */

exports.publish = (data, markup, css) => {
    api
        .publish(data, markup, css, "https://miller-furniture.myshopify.com")
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });
};
