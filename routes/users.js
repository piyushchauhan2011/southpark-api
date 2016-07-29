var express = require('express');
var router = express.Router();
var knex = require('../knexfile');
var bookshelf = require('../bookshelf');
var User = require('../models/user');
var isAuthenticated = require('../isAuthenticated');

/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  // knex
  //   .select('*')
  //   .from('users')
  //   .then(function(users) {
  //     return users;
  //   }).then(function(users) {
  //     res.status(200).json(users);
  //   });
  new User().fetchAll()
    .then(function(users) {
      res.json(users);
    });
});

module.exports = router;
