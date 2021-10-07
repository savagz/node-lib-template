// Events Emitter
const EventEmitter = require('events');

// Default Logger
const Logger = require('./loggers/logger.js');
const logger = new Logger();

// Main Controller
const Controller = require('./controllers/controller');

// Config Parameters
const CONFIG_DEFAULTS = {
    logger,
    settings: {}
};

// Main Class
class DemoService extends EventEmitter {

    /** Constructor */
    constructor(config = {}) {
        super();

        this.started = false;
        
        this.config = Object.freeze(Object.assign({}, CONFIG_DEFAULTS, config));
        this.logger = this.config.logger;
        this.settings = this.config.settings ? this.config.settings : {};

        this.events = new EventEmitter();
        this.addListeners();

        this.controller = null;
    }

    /** Add Listeners */
    addListeners() {
        this.on('started', () => {
            this.started = true;
        });
        this.events.on('somemsg', (msg) => {

        });
    }

    /** Start NDIS Service */
    start() {
        this.logger.debug('Starting Service');
        this.emit("started");

        // Main Controller
        this.controller = new Controller(this.events, this.settings, this.logger);
    }

    /** Stop Services & Clean */
    disconnect() {
        this.logger.debug('Finishing Service');
        this.started = false;
        
        // Controller
        this.controller.disconnect();
        this.controller = null;
        
        this.emit('disconnected');
        this.events.removeAllListeners();
        this.removeAllListeners();
    }

}

// ------------- Exports ------------- //

exports.DemoService = DemoService;

exports.createService = function (config) {
    return new DemoService(config);
};
