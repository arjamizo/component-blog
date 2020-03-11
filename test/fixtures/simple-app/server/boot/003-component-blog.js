
module.exports = function storage(app) {
  var storage = require('../../../../../lib');

  var options = {
    // custom user model
    userModel: 'user', // specify your custom user model

    // used by modelBuilder, component-issue-handler/lib/models/index.js
    // Data source for metadata persistence
    dataSource: app.dataSources.db,
  };
  app.set('component-blog', options);
  storage(app, options);
};
