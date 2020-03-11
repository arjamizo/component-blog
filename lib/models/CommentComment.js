
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:commentcomment:model');
  const {userModel} = options;
  const commentCommentModel = blogModels.CommentComment;
  const postCommentModel = blogModels.PostComment;

  // update relationships
  commentCommentModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  commentCommentModel.belongsTo(userModel,
    {as: 'userModified', foreignKey: 'modifiedBy'});
  commentCommentModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});
  commentCommentModel.belongsTo(postCommentModel,
    {as: 'postComment', foreignKey: 'commentId'});

  let commentComment = {};
  return commentComment;
};
