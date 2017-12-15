import Router from 'koa-router';
import articleCategories from '../../controllers/api/article_categories';

const router = Router({
  prefix: '/api/article_categories'
});
router.get('/', articleCategories.index);
router.get('/options', articleCategories.getCategorieOptions);
router.get('/:id', articleCategories.show);
router.put('/:id', articleCategories.checkLogin, articleCategories.checkArticleCategoryOwner, articleCategories.checkParamsBody, articleCategories.update);
router.post('/', articleCategories.checkLogin, articleCategories.checkParamsBody, articleCategories.create);
router.delete('/:id', articleCategories.checkLogin, articleCategories.checkArticleCategoryOwner, articleCategories.checkParamsBody, articleCategories.remove);

// for require auto in index.js
module.exports = router;
