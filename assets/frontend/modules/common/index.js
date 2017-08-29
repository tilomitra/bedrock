var flux = require("../../reactor");

flux.registerStores({
    counterStore: require("./counter-store")
});

module.exports = {
    actions: require("./actions"),
    getters: require("./getters")
};
