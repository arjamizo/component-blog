
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:postshare:model');
  const {userModel} = options;
  const postShareModel = blogModels.PostShare;
  const postModel = blogModels.Post;

  // update relationships
  postModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postModel.belongsTo(userModel,
    {as: 'userSharedWith', foreignKey: 'sharedWith'});
  postModel.belongsTo(postModel,
    {as: 'post', foreignKey: 'postId'});

  let postShare = {};
  return postShare;
};
