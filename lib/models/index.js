
const debug = require('debug')('component:blog');
const accessLogger = require('../middleware/access-logger');
const userContext = require('../middleware/user-context');
const logger = require('../middleware/logging');
const reqLogger = require('../middleware/request-logging');

module.exports = function componentBlog(app, options) {
  debug('initializing component');
  const {loopback} = app;
  options = options || {};

  let dataSource = options.dataSource;
  /* istanbul ignore if */
  if (typeof dataSource === 'string') {
    dataSource = app.dataSource[dataSource];
  }
  const blogModels = require('./component-blog-models')(dataSource);
  const userModel = loopback.findModel(options.userModel) ||
      loopback.getModelByType(loopback.User);
  debug('User model: %s', userModel.modelName);

  const venueModel = loopback.findModel(options.venueModel);
  // debug('Venue model: %s', venueModel.modelName);

  // Initialize middleware
  app.middleware('initial:before', logger());
  app.middleware('initial:before', reqLogger());
  app.middleware('auth:after', userContext());
  app.middleware('routes:before', accessLogger());

  let users = {};
  let venue = {};

  let internalConfig = {
    userModel: userModel,
    venueModel: venueModel,
  };

  // specific to app
  const post = require('./Post')(blogModels, internalConfig);
  const postLike = require('./PostLike')(blogModels, internalConfig);
  const postMention = require('./PostMention')(blogModels, internalConfig);
  const postShare = require('./PostShare')(blogModels, internalConfig);
  const postComment = require('./PostComment')(blogModels, internalConfig);
  const commentComment =
    require('./CommentComment')(blogModels, internalConfig);
  const postMedia = require('./PostMedia')(blogModels, internalConfig);
  const blogReported = require('./BlogReported')(blogModels, internalConfig);

  let customModels = options.models || {};
  let models = {
    user: customModels.users || users,
    venue: customModels.venue || venue,
    blogReported: customModels.blogReported || blogReported,
    post: customModels.post || post,
    postLike: customModels.postLike || postLike,
    postMention: customModels.postMention || postMention,
    postShare: customModels.postShare || postShare,
    postComment: customModels.postComment || postComment,
    commentComment: customModels.commentComment || commentComment,
    postMedia: customModels.postMedia || postMedia,
  };

  return models;
};
