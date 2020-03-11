
const postDef = require('../../common/models/Model.Post.json');
const postLikeDef = require('../../common/models/Model.PostLike.json');
const postMentionDef = require('../../common/models/Model.PostMention.json');
const postShareDef = require('../../common/models/Model.PostShare.json');
const postCommentDef = require('../../common/models/Model.PostComment.json');
const postMediaDef = require('../../common/models/Model.PostMedia.json');
const commentCommentDef =
  require('../../common/models/Model.CommentComment.json');
const blogReportedDef = require('../../common/models/Model.BlogReported.json');

// Remove proerties that will confuse LB
function getSettings(def) {
  let settings = {};
  for (var s in def) {
    if (s === 'name' || s === 'properties') {
      continue;
    } else {
      settings[s] = def[s];
    }
  }
  return settings;
}

module.exports = function(dataSource) {
  // "Post"
  const Post = dataSource.createModel(
    postDef.name,
    postDef.properties,
    getSettings(postDef)
  );

  // "Post Like"
  const PostLike = dataSource.createModel(
    postLikeDef.name,
    postLikeDef.properties,
    getSettings(postLikeDef)
  );

  // "Post Mention"
  const PostMention = dataSource.createModel(
    postMentionDef.name,
    postMentionDef.properties,
    getSettings(postMentionDef)
  );

  // "Post Share"
  const PostShare = dataSource.createModel(
    postShareDef.name,
    postShareDef.properties,
    getSettings(postShareDef)
  );

  // "Post Comment"
  const PostComment = dataSource.createModel(
    postCommentDef.name,
    postCommentDef.properties,
    getSettings(postCommentDef)
  );

  // "Comment Comment"
  const CommentComment = dataSource.createModel(
    commentCommentDef.name,
    commentCommentDef.properties,
    getSettings(commentCommentDef)
  );

  // "Post Media"
  const PostMedia = dataSource.createModel(
    postMediaDef.name,
    postMediaDef.properties,
    getSettings(postMediaDef)
  );

  // "Blog Reported"
  const BlogReported = dataSource.createModel(
    blogReportedDef.name,
    blogReportedDef.properties,
    getSettings(blogReportedDef)
  );

  return {
    Post: Post,
    PostLike: PostLike,
    PostMention: PostMention,
    PostShare: PostShare,
    PostComment: PostComment,
    CommentComment: CommentComment,
    PostMedia: PostMedia,
    BlogReported: BlogReported,
  };
};
