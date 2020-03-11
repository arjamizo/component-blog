
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:postmention:model');
  const {userModel} = options;
  const postMentionModel = blogModels.PostMention;
  const postModel = blogModels.Post;

  // update relationships
  postModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});
  postModel.belongsTo(postModel,
    {as: 'post', foreignKey: 'postId'});

  let postMention = {};
  return postMention;
};
