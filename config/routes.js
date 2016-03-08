var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var todosController = require('../controllers/todos');

// root path:
router.get('/',      pagesController.home);
router.get('/about', pagesController.about);
router.get('/todos', pagesController.todos);

// todos resource paths:
router.get(   '/api/todos',     todosController.index);
router.get(   '/api/todos/:id', todosController.show);
router.post(  '/api/todos',     todosController.create);
router.put(   '/api/todos/:id', todosController.update);
router.delete('/api/todos/:id', todosController.destroy);

module.exports = router;
