var nuclear = require("../../reactor");
var actionTypes = require("../action-types");
import api from "../../api";

/* API Methods */

exports.publish = (data, markup, css) => {
    api
        .publish(data, markup, css, "https://miller-furniture.myshopify.com")
        .then(resp => {
            nuclear.dispatch(actionTypes.PUBLISH_SUCCESS, { data: resp });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.fetchEntity = entity => {
    const actionTypeSuccess = `FETCH_${entity.toUpperCase()}_SUCCESS`;
    const actionTypeFailure = `FETCH_${entity.toUpperCase()}_FAILURE`;
    api
        .fetch(entity)
        .then(data => {
            nuclear.dispatch(actionTypes[actionTypeSuccess], {
                data: data
            });
        })
        .catch(err => {
            nuclear.dispatch(actionTypes[actionTypeFailure], err);
            console.log(err);
        });
};

exports.saveEntity = (entity, dataToSave) => {
    const actionTypeSuccess = `SAVE_${entity.toUpperCase()}_SUCCESS`;
    const actionTypeFailure = `SAVE_${entity.toUpperCase()}_FAILURE`;

    const payload = {};
    payload[entity] = dataToSave;

    api
        .refresh(entity, payload)
        .then(data => {
            nuclear.dispatch(actionTypes[actionTypeSuccess], { data });
        })
        .catch(err => {
            nuclear.dispatch(actionTypes[actionTypeFailure], err);
            console.log(err);
        });
};

//-------------------

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

// exports.fetchMission = () => {
//     api
//         .fetch("missions")
//         .then(data => {
//             nuclear.dispatch(actionTypes.FETCH_MISSION_SUCCESS, {
//                 data: data[0]
//             });
//         })
//         .catch(err => {
//             nuclear.dispatch(actionTypes.FETCH_MISSION_FAILURE, err);
//             console.log(err);
//         });
// };

// exports.saveMission = mission => {
//     api
//         .refresh("missions", {
//             title: mission.get("title"),
//             subtitle: mission.get("tagline")
//         })
//         .then(data => {
//             nuclear.dispatch(actionTypes.SAVE_MISSION_SUCCESS, { data });
//         })
//         .catch(err => {
//             nuclear.dispatch(actionTypes.SAVE_MISSION_FAILURE, err);
//             console.log(err);
//         });
// };

/* Achievements */

// exports.fetchAchievements = () => {
//     api
//         .fetch("achievements")
//         .then(data => {
//             nuclear.dispatch(actionTypes.FETCH_ACHIEVEMENTS_SUCCESS, {
//                 data: data
//             });
//         })
//         .catch(err => {
//             nuclear.dispatch(actionTypes.FETCH_ACHIEVEMENTS_FAILURE, err);
//             console.log(err);
//         });
// };

exports.addAchievement = () => {
    nuclear.dispatch(actionTypes.ADD_ACHIEVEMENT);
};

exports.removeAchievement = index => {
    nuclear.dispatch(actionTypes.REMOVE_ACHIEVEMENT, { index });
};

exports.updateAchievement = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_ACHIEVEMENT, { index, attr, value });
};

// exports.saveAchievements = achievements => {
//     api
//         .refresh("achievements", achievements)
//         .then(data => {
//             nuclear.dispatch(actionTypes.SAVE_ACHIEVEMENT_SUCCESS, { data });
//         })
//         .catch(err => {
//             nuclear.dispatch(actionTypes.SAVE_ACHIEVEMENT_FAILURE, err);
//             console.log(err);
//         });
// };

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
    nuclear.dispatch(actionTypes.ADD_IMAGE);
};

exports.removeGallery = index => {
    nuclear.dispatch(actionTypes.REMOVE_IMAGE, { index });
};

exports.updateGallery = (index, attr, value) => {
    nuclear.dispatch(actionTypes.UPDATE_IMAGE, { index, attr, value });
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
