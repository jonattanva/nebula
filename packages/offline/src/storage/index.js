import { READ_WRITE, READONLY, SYNCHRONIZED, QUEUES } from '../constants.js';

/**
 * @template T
 * @param {name} name
 *          The name of the database.
 * @param {number} version
 *          The version to open the database with
 * @returns {import('./public.js').Connection<T>}
 */
const getConnection = (name, version = 1) => {
    return {
        /**
         * @template {import('./public.js').Entity} T
         * @param {string} store
         *          The name of object store that are in the scope of the new transaction
         * @param {T} value
         *          The value to be stored
         * @returns {Promise<T>}
         */
        save: function (store, value) {
            return save(name, store, value, version);
        },

        /**
         * @template T
         * @param {string} store
         *          The name of object store that are in the scope of the new transaction
         * @param {import('./public.js').Query} query
         *          Represents a continuous interval over some data type that is used for keys.
         * @returns {Promise<T>}
         */
        select: function (store, query) {
            return select(name, store, query, version);
        }
    };
};

/**
 * @template {import('./public.js').Entity} T
 * @param {string} name
 *          The name of the database.
 * @param {string} store
 *          The name of object store that are in the scope of the new transaction
 * @param {T} value
 *          The value to be stored
 * @param {number} version
 *          The version to open the database with
 * @returns {Promise<T>}
 */
const save = (name, store, value, version) => {
    return new Promise((resolve, reject) => {
        query(name, store, READ_WRITE, version)
            .then((objectStore) => {
                const request = objectStore.get(value.$$key);

                request.onsuccess = () => {
                    const result = objectStore.put(value);
                    result.onsuccess = () => {
                        resolve(value);
                    };
                    result.onerror = reject;
                };

                request.onerror = () => {
                    const result = objectStore.add(value);
                    result.onsuccess = () => {
                        resolve(value);
                    };
                    result.onerror = reject;
                };
            })
            .catch(reject);
    });
};

/**
 * @template {import('./public.js').Entity} T
 * @param {string} name
 *          The name of the database.
 * @param {string} store
 *          The name of object store that are in the scope of the new transaction
 * @param {import('./public.js').Query} query
 *          Represents a continuous interval over some data type that is used for keys.
 * @param {number} version
 *          The version to open the database with
 * @returns {Promise<T>}
 */
const select = (name, store, query, version) => {
    return new Promise((resolve, reject) => {
        query(name, store, READONLY, version)
            .then((objectStore) => {
                const request = where(objectStore, query);
                if (!request) {
                    resolve([]);
                    return;
                }

                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = reject;
            })
            .catch(reject);
    });
};

/**
 * @param {IDBObjectStore} objectStore
 *          Represents an object store in the database
 * @param {import('./public.js').Query} query
 *          Represents a continuous interval over some data type that is used for keys.
 * @returns {IDBRequest|null}
 */
const where = (objectStore, query) => {
    if ('index' in query) {
        if (!hasObjectStoreIndexNames(objectStore, query.range.index)) {
            return null;
        }

        return objectStore
            .index(query.range.index)
            .getAll(query.range.range, query.count);
    }

    return objectStore.getAll(query.range, query.count);
};

/**
 * @param {name} name
 *          The name of the database.
 * @param {number} version
 *          The version to open the database with
 * @returns {Promise<IDBDatabase>}
 */
const open = (name, version) => {
    return new Promise((resolve, reject) => {
        if (!isSupport()) {
            reject("This browser doesn't support IndexedDB.");
            return;
        }

        const request = indexedDB.open(name, version);

        request.onsuccess = (event) => {
            resolve(event.target);
        };

        request.error = (event) => {
            reject(event);
        };

        request.onupgradeneeded = (event) => {
            upgrade(event.target);
        };
    });
};

/**
 * @param {string} name
 *          The name of the database.
 * @param {string} store
 *           The name of object store that are in the scope of the new transaction
 * @param {string} mode
 *          The types of access that can be performed in the transaction
 * @param {number} version
 *          The version to open the database with
 * @returns {Promise<IDBObjectStore>}
 */
const query = (name, store, mode, version) => {
    return new Promise((resolve, reject) => {
        open(name, version)
            .then((database) => {
                if (hasObjectStoreNames(database, store)) {
                    const transaction = database
                        .transaction([store], mode)
                        .objectStore(store);

                    resolve(transaction);
                } else {
                    reject(
                        new Error(`The '${store}' object store was not found`)
                    );
                }
            })
            .catch(reject);
    });
};

/**
 * @param {IDBDatabase} database
 *          The database connection
 * @param {string} store
 *           The name of object store that are in the scope of the new transaction
 * @returns {boolean}
 */
const hasObjectStoreNames = (database, store) => {
    return database.objectStoreNames.contains(store);
};

/**
 * @param {IDBObjectStore} store
 *          Represents an object store in the database
 * @param {string} name
 *          The name of object store that are in the scope of the new transaction
 * @returns {boolean}
 */
const hasObjectStoreIndexNames = (store, name) => {
    return store.indexNames.contains(name);
};

/**
 * @returns {boolean}
 */
const isSupport = () => {
    return typeof window !== 'undefined' && 'indexedDB' in window;
};

/**
 * @param {IDBDatabase} database
 *          The database connection
 * @returns {void}
 */
const upgrade = (database) => {
    if (!hasObjectStoreNames(database, QUEUES)) {
        const objectStore = database.createObjectStore(QUEUES, {
            keyPath: 'key'
        });

        objectStore.createIndex(SYNCHRONIZED, SYNCHRONIZED, {
            unique: false
        });
    }
};

export { getConnection };
