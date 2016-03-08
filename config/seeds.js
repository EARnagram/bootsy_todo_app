var mongoose = require('./database');

var Todo = require('../models/todo');

var todos = [
  {
    task:      "Refer to yourself by your bootsified name.",
    completed: false,
    bootsyLvl: 3,
  },
  {
    task:      "Wear star-shaped glasses.",
    completed: true,
    bootsyLvl: 1,
  },
  {
    task:      "Create a Bootsified name for yourself. Try it out.",
    completed: false,
    bootsyLvl: 2,
  },
];

Todo.remove({}, function(err) {
  if (err) console.log(err);
  Todo.create(todos, function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + todos.length  + " todos.");
      mongoose.disconnect();
      process.exit();
    }
  });
});
