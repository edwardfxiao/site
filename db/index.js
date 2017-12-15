const ENV = require('../.env.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(ENV.DB_URL);
module.exports = mongoose;

