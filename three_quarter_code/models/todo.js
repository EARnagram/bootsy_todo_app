var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  task:        { type: String,  required: true },
  bootsyLevel: { type: Number,  required: true, min: 0, max: 5 },
  completed:   { type: Boolean, default: false }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
