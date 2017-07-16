var flux = require("../../reactor");

flux.registerStores({
    general: require("./stores/general-store"),
    about: require("./stores/about-store"),
    mission: require("./stores/mission-store"),
    achievements: require("./stores/achievement-store"),
    milestones: require("./stores/milestone-store"),
    gallery: require("./stores/gallery-store"),
    team: require("./stores/team-store")
});

module.exports = {
    actions: require("./actions"),
    getters: require("./getters")
};
