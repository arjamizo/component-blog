
const debug = require('debug')('component:blog:helper:utils');

module.exports = class Utils {
  escapeSpecialChars(jsonString) {
    return jsonString.replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\f/g, '\\f');
  }
};
