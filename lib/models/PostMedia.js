
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:postmedia:model');
  const {userModel} = options;
  const postMediaModel = blogModels.PostMedia;
  const postModel = blogModels.Post;

  // update relationships
  postMediaModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postMediaModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});
  postMediaModel.belongsTo(postModel,
    {as: 'post', foreignKey: 'postId'});

  let postMedia = {};
  return postMedia;
};
