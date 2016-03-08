module.exports = {
  home:  home,
  about: about,
  todos: todos
};

function home(req, res, next) {
  res.render('pages/home');
};

function about(req, res, next) {
  res.render('pages/about');
};

function todos(req, res, next) {
  res.render('pages/todos');
};
