// Main Class
class Controller {

    /**
     * Constructor
     * @param {EventEmitter} _events Event Emmiter
     */
    constructor(_events, _settings, _logger) {
        this.events = _events;
        this.settings = _settings;
        this.logger = _logger;
    }

    /**
     * Stop Controller
     */
    disconnect(){
        this.logger.debug('Stop Controller');
    }

}

// ------------- Exports ------------- //

module.exports = Controller;