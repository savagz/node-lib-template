/* eslint-disable no-console */
const lib = require('./lib');

if (module.parent) {
    module.exports = lib;

} else {
    const logger = new lib.Logger();
    // const logger = new lib.SilentLogger();

    const config = {
        logger,
        settings: {

        }
    };

    /**
     * Initialization Library
     */
    const srvdemo = new lib.DemoService(config);

    /**
    * Listener : Service Started
    */
    srvdemo.on('started', () => {
        logger.debug('Service :: Started');
    });

    /**
    * Listener : Disconnect 
    */
    srvdemo.on('disconnected', () => {
        logger.debug('Service :: Disconnected');
    });

    /**
     * Listener : For Messages & Notifications
     */
    srvdemo.on('message', msg => {
        logger.debug('Service :: Message : ', msg);
    });

    /**
     * End Service by SigInt
     */
    process.on('SIGINT', () => {
        srvdemo.disconnect();
        process.exit();
    });

    /**
     * End Service by SigTerm
     */
    process.on('SIGTERM', () => {
        srvdemo.disconnect();
        process.exit();
    });

    /**
     * Timeout (Finish Demo)
     * (Not necessary for Production Environment)
     */
    setTimeout(() => {
        logger.debug(`Timeout Test ...`);
        srvdemo.disconnect();
    }, 60000);

    /** START */
    srvdemo.start();
}

/* eslint-enable no-console */
