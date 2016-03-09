var Todo = require("../models/todo");

module.exports = {
  index:   index,
  create:  create
};

function index(req, res, next) {
  console.log("Bootsy's on a roll, baby!!");

  Todo.find({}, function(err, todos) {
    if (err) next(err);

    res.json(todos);
  });
};

function create(req, res, next) {
  console.log("Brand new Bootsy todo, bobble!!", req.body);

  var newTodo = new Todo(req.body);
  newTodo.save(function(err, savedTodo) {
    if (err) next(err)

    res.json(savedTodo);
  });
};
