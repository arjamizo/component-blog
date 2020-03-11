
/**
 * Module dependencies.
 */
const path = require('path');
const SG = require('strong-globalize');
SG.SetRootDir(path.join(__dirname, '..'));
const g = SG();
const componentBlog = require('./component-blog');
var exports = module.exports = componentBlog;
