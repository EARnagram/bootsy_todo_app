var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  task:      String,
  bootsyLvl: Number,
  completed: { type: Boolean, default: false }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
