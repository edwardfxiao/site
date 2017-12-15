import Router from 'koa-router';
import articleCategories from '../controllers/article_categories';

const router = Router({
  prefix: '/article_categories'
});
router.get('/', articleCategories.index);
router.get('/new', articleCategories.index);
router.get('/:id', articleCategories.index);
router.get('/:id/edit', articleCategories.index);

// for require auto in index.js
module.exports = router;
