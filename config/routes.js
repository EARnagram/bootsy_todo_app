var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var todosController   = require('../controllers/todos');

// root path:
router.get('/', welcomeController.index);

// todos resource paths:
router.get('/todos',        todosController.index);
router.get('/todos/:id',    todosController.show);
router.post('/todos',       todosController.create);
router.put('/todos/:id',    todosController.update);
router.delete('/todos/:id', todosController.destroy);

module.exports = router;
