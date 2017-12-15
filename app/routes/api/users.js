import Router from 'koa-router';
import users from '../../controllers/api/users';

const router = Router({
  prefix: '/api/users'
});
router.post('/login', users.login);
router.post('/signup', users.signup);
router.post('/logout', users.logout);
router.delete('/delete', users.remove);
router.post('/send-verify-code', users.sendVerifyCode);
router.post('/captcha', users.captcha);

// for require auto in index.js
module.exports = router;
