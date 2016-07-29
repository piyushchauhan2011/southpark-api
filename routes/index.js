var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var a = 23;
  res.status(200).json({ title: 'Something' });
});

module.exports = router;
