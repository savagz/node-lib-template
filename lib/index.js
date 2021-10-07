// Imports
const { DemoService, createService } = require('./service');
const Logger = require('./loggers/logger.js');
const SilentLogger = require('./loggers/silent-logger');

// Exports
exports.createService = createService;
exports.DemoService = DemoService;

exports.SilentLogger = SilentLogger;
exports.Logger = Logger;