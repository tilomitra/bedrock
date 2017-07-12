var flux = require("../../reactor");

flux.registerStores({
    mission: require("./stores/mission-store"),
    achievements: require("./stores/achievement-store"),
    milestones: require("./stores/milestone-store")
});

module.exports = {
    actions: require("./actions"),
    getters: require("./getters")
};
