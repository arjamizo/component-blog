
let _ = require('lodash');
let fs = require('fs');
let appRoot = require('app-root-path');
let pino = require('pino');
let multistream = require('pino-multi-stream').multistream;
let useragent = require('useragent');
let util = require('util');

let logsDir = appRoot.resolve('/logs');

var DEFAULT_CONFIG = {
  // Extended config which is removed
  features: [
    'ip',
    'method',
    'url',
    'referer',
    'userAgent',
    'body',
    'responseTime',
    'statusCode',
  ],
  parseUA: false,
  truncateBody: false,
  pino: {
    streams: [
      {
        level: 'debug',
        stream: fs.createWriteStream(logsDir + '/requests.log'),
      },
      {
        level: 'fatal',
        stream: fs.createWriteStream(logsDir + '/fatal.log'),
      },
    ],
  },
};

module.exports = function(config) {
  config = _.merge(DEFAULT_CONFIG, config);

  let logger = pino({
    level: 'debug', // this MUST be set at the lowest level of the destinations
  }, multistream(config.pino.streams));

  return function(req, res, next) {
    let startTime = process.hrtime();

    let logCtx = {requestId: req.id};
    if (req.accessToken) {
      logCtx.accessToken = req.accessToken.id;
      logCtx.userId = req.accessToken.userId;
    }

    let childLogger = logger.child(logCtx, true);

    res.on('finish', function() {
      childLogger.info(buildPayload(), 'request done');
    });

    res.on('close', function() {
      childLogger.warn(buildPayload(), 'socket closed');
    });

    next();

    function buildPayload() {
      let payload;
      let hrResponseTime = process.hrtime(startTime);
      let responseTime = hrResponseTime[0] * 1e3 + hrResponseTime[1] / 1e6;

      var properties = {
        ip: req.ip || req.connection.remoteAddress ||
              (req.socket && req.socket.remoteAddress) ||
              (req.socket.socket && req.socket.socket.remoteAddress),
        method: req.method,
        url: decodeURIComponent((req.baseUrl || '') + (req.url || '')),
        referer: req.header('referer') || req.header('referrer'),
        userAgent: req.header('user-agent'),
        body: req.body,
        httpVersion: req.httpVersionMajor + '.' + req.httpVersionMinor,
        responseTime: responseTime,
        hrResponseTime: hrResponseTime,
        statusCode: res.statusCode,
        requestHeaders: req.headers,
        responseHeaders: res._headers,
        req: req,
        res: res,
      };

      if (!config.features || config.features === '*') {
        payload = properties;
      } else {
        payload = _.pick(properties, config.features);
      }

      if (payload.userAgent && config.parseUA) {
        payload.userAgent = useragent.parse(payload.userAgent);
      }

      if (payload.body && config.truncateBody) {
        if (config.truncateBody === true) {
          config.truncateBody = 20;
        }
        payload.body = util.inspect(payload.body)
          .substring(0, config.truncateBody);
      }

      return payload;
    }
  };
};
