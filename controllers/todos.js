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
  console.log("Bootsy's on a roll, baby!!");

  Todo.find({}, function(err, todos) {
    if (err) next(err);

    res.json(todos);
  });
};

//||||||||||||||||||||||||||--
// GET TODO - SHOW
//||||||||||||||||||||||||||--
function show(req, res, next){
  var id = req.params.id;
  console.log("Get me that Bootsy, baby!!", id);

  Todo.findById(id, function(err, todo){
    if (err) next(err);

    res.json(todo);
  });
};

//||||||||||||||||||||||||||--
// POST TODOS - CREATE
//||||||||||||||||||||||||||--
function create(req, res, next) {
  console.log("Brand new Bootsy todo, baby!!", req.body);

  var newTodo = new Todo(req.body);
  newTodo.save(function(err, savedTodo) {
    if (err) next(err)

    res.json(savedTodo);
  });
};

//||||||||||||||||||||||||||--
// PUT TODO - UPDATE
//||||||||||||||||||||||||||--
function update(req, res, next) {
  var id = req.params.id;
  console.log("Show bootsy that body, baby!!", id, req.body);

  Todo.findById(id, function(err, todo) {
    if (err || !todo) {
      next(err);
    } else {
      // set the new todo information if it exists in the request
      if (req.body.task)        todo.task        = req.body.task;
      if (req.body.bootsyLevel) todo.bootsyLevel = req.body.bootsyLevel;
      if (req.body.completed)   todo.completed   = req.body.completed;

      todo.save(function(err, updatedTodo) {
        if (err) next(err);

        console.log("Yabba dabba, doozy, baba - we changed it up!");
        res.json(updatedTodo);
      });
    }
  });
}

//||||||||||||||||||||||||||--
// DELETE TODO - DESTROY
//||||||||||||||||||||||||||--
function destroy(req, res, next) {
  var id = req.params.id;
  console.log("Say todaloo todo, Bootsy!!", id);

  Todo.remove({"_id" : id}, function(err, todo) {
    // Only triggers if there is a major problem; will not fail
    // if trying to remove something that isn't there…
    if (err) next(err);

    // Let us know if it's a successful delete
    res.json({ message: "Just let that todo chill, baby!" });
  });
}
