module.exports = {
  index: index
};

function index(req, res, next) {
  res.render('index', {
    title: "Bootsy's Todo App"
  });
};
