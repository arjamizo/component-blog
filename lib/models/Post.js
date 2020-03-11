
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:post:model');
  const {userModel, venueModel} = options;
  const postModel = blogModels.Post;

  // console.log(blogModels);
  // console.log(options);

  // update relationships
  postModel.belongsTo(userModel,
    {as: 'userCreated', foreignKey: 'createdBy'});
  postModel.belongsTo(userModel,
    {as: 'userModified', foreignKey: 'modifiedBy'});
  postModel.belongsTo(userModel,
    {as: 'userDeleted', foreignKey: 'deletedBy'});

  if (venueModel !== undefined) {
    postModel.belongsTo(venueModel,
      {as: 'venue', foreignKey: 'venueId'});
  }

  let post = {};
  return post;
};
