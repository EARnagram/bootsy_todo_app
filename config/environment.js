var _ = require('lodash');

var localEnvVars = {
  TITLE:      "Bootsy's Todo App",
  SAFE_TITLE: 'bootsy_todo'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
