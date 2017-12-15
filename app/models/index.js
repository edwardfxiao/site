import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import ENV from '../../.env';
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/edwardxiao');
mongoose.connect(ENV.DB_URL, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});
const basename = path.basename(module.filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file));
    let name = file.slice(0, -3);
    name = name[0].toUpperCase() + name.slice(1);
    db[name] = model.default;
  });

export default db;
