
let _ = require('lodash');
let fs = require('fs');
let appRoot = require('app-root-path');
let pino = require('pino');
let multistream = require('pino-multi-stream').multistream;
let uuid = require('uuid');

let LoopbackContext = require('loopback-context');

let DEFAULT_CONFIG = {
  name: 'loopback',
  streams: [{
    stream: fs.createWriteStream(appRoot.resolve('/logs') + '/requests.log'),
  },
  {
    level: 'debug',
    stream: fs.createWriteStream(appRoot.resolve('/logs') + '/requests.log'),
  },
  {
    level: 'fatal', stream: fs.createWriteStream(
      appRoot.resolve('/logs') + '/fatal.log'),
  }],
};

module.exports = function(config) {
  config = _.merge(DEFAULT_CONFIG, config);

  // Attempt to ensure file logging output path is available
  let logPath = appRoot.resolve('/logs');
  if (!fs.existsSync(logPath)) {
    try {
      fs.mkdirSync(logPath);
    } catch (e) {}
  }

  let logger = pino({
    level: 'debug', // this MUST be set at the lowest level of the destinations
  }, multistream(config.streams));

  return function(req, res, next) {
    // Generate a new unique request ID if necessary
    req.id = res.id = req.id || uuid.v4();
    res.setHeader('Request-Id', req.id);

    let logCtx = {requestId: req.id};
    if (req.accessToken) {
      logCtx.accessToken = req.accessToken.id;
      logCtx.userId = req.accessToken.userId;
    }

    req.log = logger.child(logCtx, true);

    var loopbackContext = LoopbackContext.getCurrentContext({bind: true});
    if (loopbackContext) loopbackContext.set('logger', req.log);

    next();
  };
};
