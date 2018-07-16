"use strict";

let config = require('../config.json');
let Database = require('../Database');

Database.connect();

module.exports = function*(next) {
  this.db = Database.db;
  yield next;
};
