/* eslint no-console: 0 */
require('cls-hooked');
const loopback = require('loopback');
const boot = require('loopback-boot');
var bodyParser = require('body-parser');
const multer = require('multer');
const app = module.exports =  loopback();

app.use(bodyParser.json({strict: false, limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'})); // for parsing application/x-www-form-urlencoded
app.use(multer().any());

let started = false;

// The access token is only available after boot
// app.use(neaty.token({model: app.models.WeflexAccessToken}));
app.once('started', function() {
  started = true;
});

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');

    const baseUrl = app.get('url').replace(/\/$/, '');

    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;

      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

if (require.main === module) {
  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  app.once('booted', function() {
    app.start();
  });

  boot(app, __dirname);
} else {
  function init(ready) {
    if (started === true) {
      return app;
    }
    if (typeof ready !== 'function') {
      throw TypeError('ready must be a function');
    }

    app.once('booted', function() {
      app.start();
    });

    app.once('started', function() {
      ready(null, app);
    });

    boot(app, __dirname);
    return app;
  };
  module.exports = init;
}
