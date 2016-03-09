var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var todosController = require('../controllers/todos');

// root path:
router.get('/',      pagesController.home);
router.get('/about', pagesController.about);
router.get('/todos', pagesController.todos);

// API paths
router.get('/api/todos',  todosController.index)
router.post('/api/todos', todosController.create)

module.exports = router;
