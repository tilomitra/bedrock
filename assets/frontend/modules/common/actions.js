var nuclear = require('../../reactor');
var actionTypes = require('../action-types');

/**
 * Dispatches action when an API fetch request starts
 * @private
 *
 * @param {string} entity
 * @param {Deferred} deferred
 */
function onFetchStart(entity, deferred) {
    nuclear.dispatch(actionTypes.ENTITY_FETCH_START, {
        entity: entity,
        deferred: deferred
    });
}

/**
 * Dispatch an ENTITY_FETCH_SUCCESS event to the system
 * @private
 *
 * @param {string} entity
 * @param {object|array} response
 */
function onFetchSuccess(entity, response) {
    nuclear.dispatch(actionTypes.ENTITY_FETCH_SUCCESS, {
        entity: entity,
        data: response
    });
    return response;
}

/**
 * Dispatch an ENTITY_FETCH_FAIL event to the system
 * @private
 *
 * @param {string} entity
 * @param {string} error
 */
function onFetchFail(entity, error) {
    nuclear.dispatch(actionTypes.ENTITY_FETCH_FAIL, {
        type: 'error',
        entity: entity,
        message: error
    });
    return error;
}

