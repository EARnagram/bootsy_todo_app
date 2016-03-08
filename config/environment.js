var _ = require('lodash');

var localEnvVars = {
  TITLE:      'bootsy_todo_spa',
  SAFE_TITLE: 'bootsy_todo_spa'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
