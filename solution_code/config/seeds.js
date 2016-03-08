var mongoose = require('./database');

var Todo = require('../models/todo');

var todos = [
  {
    task:        "Refer to yourself by your bootsified name.",
    completed:   false,
    bootsyLevel: 3,
  },
  {
    task:        "Wear star-shaped glasses.",
    completed:   true,
    bootsyLevel: 1,
  },
  {
    task:        "Create a Bootsified name for yourself. Try it out.",
    completed:   false,
    bootsyLevel: 2,
  },
];

Todo.remove({}, function(err) {
  if (err) console.log(err);
  Todo.create(todos, function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + todos.length  + " todos.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
