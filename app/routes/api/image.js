import Router from 'koa-router';
import image from '../../controllers/api/image';
import koaBody from 'koa-body';

const router = Router({
  prefix: '/api/image'
});
router.post('/',   koaBody({
    multipart: true
  }), image.checkParamsBody, image.create);

// for require auto in index.js
module.exports = router;
