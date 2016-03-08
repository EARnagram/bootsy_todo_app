var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');

// root path:
router.get('/', pagesController.home);

module.exports = router;
