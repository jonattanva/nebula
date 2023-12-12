import { QUEUES } from '../constants.js';
import { getConnection } from './index.js';
import { seed } from 'nebula-core';

/**
 * @param {import('./public.js').Preference} prefrence
 * @returns {*}
 */
const getDispatch = (prefrence) => {
    const connection = getConnection('demo');
    return {
        queue: function (input, init) {
            return queue(input, init, prefrence, connection);
        }
    };
};

/**
 * @template {import('./public.js').Entity} T
 * @param {RequestInfo | URL} input
 * @param {RequestInit} init
 * @param {import('./public.js').Preference} prefrence
 * @param {import('./public.js').Connection<T>} connection
 *          The connection database
 * @returns {Promise<T>}
 */
function queue(input, init, prefrence, connection) {
    if (prefrence.priority === 'offline') {
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
