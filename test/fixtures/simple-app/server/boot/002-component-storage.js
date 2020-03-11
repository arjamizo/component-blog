
module.exports = function storage(app) {
  var storage = require('component-storage');

  var options = {
    // custom user model
    userModel: 'user', // specify your custom user model

    // used by modelBuilder, component-issue-handler/lib/models/index.js
    // Data source for metadata persistence
    dataSource: app.dataSources.db,
    keepAspectRatio: false,
    cropCenter: true,
    thumbnails: [
      {
        width: 120,
        height: 120,
      },
      {
        width: 180,
        height: 180,
      },
    ],
  };
  app.set('component-storage', options);
  storage(app, options);
};
