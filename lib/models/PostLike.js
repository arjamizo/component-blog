
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:postlike:model');
  const {userModel} = options;
  const postLikeModel = blogModels.PostLike;
  const postModel = blogModels.Post;

  // update relationships
  postModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});
  postModel.belongsTo(postModel,
    {as: 'post', foreignKey: 'postId'});

  let postLike = {};
  return postLike;
};
