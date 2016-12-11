var toImmutable = require('nuclear-js').toImmutable;


exports.lastRedirect = ['lastRedirect'];

exports.isLoading = (action) => {
    return [
        exports.loadingMap,
        (loadingStatus) => {
            return loadingStatus.get(action) || false;
        }
    ];
};

exports.getLoadingInfo = (action) => {
    return [
        exports.loadingMap,
        (loadingStatus) => {
            return loadingStatus.get(action) || null;
        }
    ];
};