var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};
db.mongoose = mongoose;

db.task = require('./task.model');

module.exports = db;