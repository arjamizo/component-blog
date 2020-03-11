
module.exports = (blogModels, options) => {
  const debug = require('debug')('component:blog:blogreported:model');
  const {userModel} = options;
  const blogReportedModel = blogModels.BlogReported;

  // update relationships
  blogReportedModel.belongsTo(userModel,
    {as: 'userReported', foreignKey: 'reportedBy'});
  blogReportedModel.belongsTo(userModel,
    {as: 'userModified', foreignKey: 'modifiedBy'});

  let blogReported = {};
  return blogReported;
};
