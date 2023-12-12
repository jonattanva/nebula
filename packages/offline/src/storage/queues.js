import { QUEUES, OFFLINE } from '../constant.js';
import { getConnection } from './connection.js';
import { seed } from 'nebula-core';

/**
 * @param {import('./public.js').Preference} preference
 *          The storage preferences
 * @returns {*}
 */
const getDispatch = (preference) => {
    const connection = getConnection('demo');
    return {
        queue: function (input, init) {
            return queue(input, init, preference, connection);
        }
    };
};

/**
 * @template {import('./public.js').Entity} T
 * @param {RequestInfo | URL} input
 *          A string or any other object with a stringifier — including a URL object — that provides the URL of the resource you want to fetch.
 * @param {RequestInit} init
 *          An object containing any custom settings you want to apply to the request.
 * @param {import('./public.js').Preference} preference
 *          The storage preferences
 * @param {import('./public.js').Connection<T>} connection
 *          The connection database
 * @returns {Promise<T>}
 */
function queue(input, init, preference, connection) {
    if (preference.priority === OFFLINE) {
        return save({ input, init }, connection);
    }
    return window.fetch(input, init);
}

/**
 * @template {import('./public.js').Entity} T
 * @param {T} value
 *          The value to be stored
 * @param {import('./public.js').Connection<T>} connection
 *          The connection database
 * @returns {Promise<T>}
 */
function save(value, connection) {
    return connection.save(QUEUES, {
        $$key: seed(),
        createdAt: Date.now(),
        synchronized: 0,
        synchronizedAt: null,
        value: value,
        version: 1
    });
}

export { getDispatch };
