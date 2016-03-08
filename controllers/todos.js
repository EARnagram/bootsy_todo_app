var Todo = require('../models/todo');

module.exports = {
  index:   index,
  show:    show,
  create:  create,
  update:  update,
  destroy: destroy
};

//||||||||||||||||||||||||||--
//  GET TODOS - INDEX
//||||||||||||||||||||||||||--
function index(req, res, next) {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }
  });
};

//||||||||||||||||||||||||||--
// GET TODO - SHOW
//||||||||||||||||||||||||||--
function show(req, res, next){
  var id = req.params.id;

  Todo.findById(id, function(err, todo){
    if (err) res.send(err);

    // return that todo as JSON
    res.json(todo);
  });
};

//||||||||||||||||||||||||||--
// POST TODOS - CREATE
//||||||||||||||||||||||||||--
function create(req, res, next) {
  var newTodo = new Todo();

  newTodo.task      = req.body.task;
  newTodo.bootsyLvl = req.body.bootsyLvl;
  newTodo.completed = req.body.completed;

  newTodo.save(function(err, savedTodo) {
    if (err) res.send(err)
    // log a message
    console.log("That's a Bootsy todo, baby!!")
    // return the todo
    res.json(savedTodo);
  });
};

//||||||||||||||||||||||||||--
// PUT TODO - UPDATE
//||||||||||||||||||||||||||--
function update(req, res) {
  var id = req.params.id;

  Todo.findById(id, function(err, todo) {

    if (err) res.send(err);

    // set the new todo information if it exists in the request
    if (req.body.task)      todo.task      = req.body.task;
    if (req.body.bootsyLvl) todo.bootsyLvl = req.body.bootsyLvl;
    if (req.body.completed) todo.completed = req.body.completed;

    // save the todo
    todo.save(function(err, updatedTodo) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Yabba dabba, doozy, baba - we changed it up!");
      // return the todo
      res.json(updatedTodo);
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE TODO - DESTROY
//||||||||||||||||||||||||||--
function destroy(req, res, next) {
  var id = req.params.id;

  Todo.remove({"_id" : id}, function(err) {
    if (err) res.send(err);
    // Let us know if it's a successful delete
    res.json({ message: "Just let that todo chill, baby!" });
  });
}
