import Router from 'koa-router';
import articles from '../../controllers/api/articles';

const router = Router({
  prefix: '/api/articles'
});
router.get('/', articles.index);
router.get('/:id', articles.show);
router.put('/:id', articles.checkLogin, articles.checkArticleOwner, articles.checkParamsBody, articles.update);
router.post('/', articles.checkLogin, articles.checkParamsBody, articles.create);
router.delete('/:id', articles.checkLogin, articles.checkArticleOwner, articles.checkParamsBody, articles.remove);

// for require auto in index.js
module.exports = router;
