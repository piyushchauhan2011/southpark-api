var knex = require('./knexfile');

module.exports = require('bookshelf')(knex);