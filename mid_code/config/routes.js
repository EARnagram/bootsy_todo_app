var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');

// root path:
router.get('/',      pagesController.home);
router.get('/about', pagesController.about);
router.get('/todos', pagesController.todos);

module.exports = router;
