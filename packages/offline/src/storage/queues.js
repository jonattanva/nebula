import seed from '../utils/seed.js';
import { QUEUES } from '../constants.js';
import { getConnection } from './index.js';

const getDispatch = () => {
    const connection = getConnection('demo');

    return {
        queue: function (input, init) {
            return push(
                {
                    input,
                    init
                },
                connection
            );
        }
    };
};

/**
 * @template {import('./public.js').Entity} T
 * @param {T} value
 *          The value to be stored
 * @param {import('./public.js').Connection<T>} connection
 *          The connection database
 * @returns {Promise<T>}
 */
function push(value, connection) {
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
