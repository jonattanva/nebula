let online = true;

/**
 * @returns {boolean}
 */
const isOnline = () => online;

const initialize = () => {
    const onOnline = () => {
        online = true;
    };

    const onOffline = () => {
        online = false;
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
    };
};

export default { isOnline, initialize };
