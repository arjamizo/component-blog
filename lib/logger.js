
let _ = require('lodash');
let LoopbackContext = require('loopback-context');

let LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
let _loggerCache = {};

module.exports = mkLogger();

function mkLogger() {
  // Recursive magic to allow us to build up scope. Enables us to do things like,
  // var log = logger('models:discussion');
  // ... later ...
  // log('functionName').info('...');
  var scope = Array.prototype.slice.call(arguments).join(':');
  if (_loggerCache[scope]) return _loggerCache[scope];

  var ctx =  scope ? mkLogger.bind(null, scope) : mkLogger.bind(null);

  LOG_LEVELS.forEach(function(level) {
    ctx[level] = mkLoggerLevel(level, scope);
  });

  _loggerCache[scope] = ctx;
  return ctx;
}

function mkLoggerLevel(level, scope) {
  return function() {
    let loopbackContext = LoopbackContext.getCurrentContext({bind: true});
    if (!loopbackContext) return;

    let logger = loopbackContext.get('logger');
    if (!logger) {
      return console.error('Logger missing from Loopback Context!');
      return;
    }

    let params = arguments;
    if (scope) {
      if (_.isObject(params[0])) {
        params[0].scope = scope;
      } else {
        params = Array.prototype.slice.call(arguments);
        params.unshift({scope: scope});
      }
    }
    return logger[level].apply(logger, params);
  };
}
