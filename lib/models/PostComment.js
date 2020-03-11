
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:postcomment:model');
  const {userModel} = options;
  const postModel = blogModels.Post;
  const postCommentModel = blogModels.PostComment;

  // update relationships
  postCommentModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postCommentModel.belongsTo(userModel,
    {as: 'userModified', foreignKey: 'modifiedBy'});
  postCommentModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});
  postCommentModel.belongsTo(postModel,
    {as: 'post', foreignKey: 'postId'});

  let postComment = {};
  return postComment;
};
