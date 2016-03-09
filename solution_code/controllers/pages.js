var Todo = require("../models/todo");

module.exports = {
  home:  home,
  about: about
};

function home(req, res, next) {
  res.render('pages/home');
};

function about(req, res, next) {
  Todo.find({}, function(err, todos) {
    res.render('pages/about', {numberOfTodos: todos.length});
  });
};
