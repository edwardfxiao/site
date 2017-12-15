import fs from 'fs';
import Path from 'path';
import Router from 'koa-router';
import home from '../controllers/home';

const basename = Path.basename(module.filename);
const router = Router();

const fileReader = function (path, file) {
    if (fs.statSync(path).isDirectory()){
      fs
        .readdirSync(path)
        .filter(function(file) {
          let newPath = path + '/' + file;
          if (fs.statSync(newPath).isDirectory()){
            return fileReader(newPath, file);
          }
          else{
            if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')){
              let route = require(Path.join(newPath));
              router.use(route.routes(), route.allowedMethods());
            }
          }
        })
    }
    if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')){
      let route = require(Path.join(path));
      router.use(route.routes(), route.allowedMethods());
    }
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    let path = __dirname + '/' + file;
    return fileReader(path, file);
  })
router.get('/', home.index);
export default router;
