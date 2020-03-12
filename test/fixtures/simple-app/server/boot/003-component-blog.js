
module.exports = function blog(app) {
  var blog = require('../../../../../lib');

  var options = {
    // custom user model
    userModel: 'user', // specify your custom user model
    uploadMediaUrl: '/api/containers/blog-media/upload',
    baseUrl: 'http://0.0.0.0:3000',

    // Data source for metadata persistence
    dataSource: app.dataSources.db,
  };
  app.set('component-blog', options);
  blog(app, options);
};
