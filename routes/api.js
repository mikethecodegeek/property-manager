var express = require('express');
var router = express.Router();

router.use('/clients', require('./clients'));
router.use('/properties', require('./properties'));


module.exports = router;
