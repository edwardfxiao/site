import logger from 'koa-logger';
import helpers from '../helpers';
import models from '../models';
import _ from 'lodash';
import ENV from '../../.env';

async function catchError(ctx, next) {
  // console.log(ctx);
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    console.log(err);
    let locale = 'zh-CN';
    if (
      typeof ctx.session.locale !== 'undefined' &&
      ctx.session.locale !== null &&
      ctx.session.locale !== ''
    ) {
      locale = ctx.session.locale;
    } else {
      ctx.session.locale = locale;
    }
    let status = err.status || 500;
    ctx.status = status;
    ctx.state = {
      preloadedState: {
        app: {
          currentUser: null,
          csrf: ctx.csrf
        },
        captchaData: '',
        locale: locale,
        qiniuDomain: ''
      },
      status: status,
      helpers: helpers
    };
    await ctx.render('error/error', {});
  }
}

async function addHelper(ctx, next) {
  var currentUser = null;
  // ctx.session.userId = null;
  if (ctx.session.userId) {
    await models.User.findById(ctx.session.userId).exec((err, res) => {
      if (_.isNull(err) && res.length) {
        let user = res[0];
        currentUser = {
          id: user._id,
          nickname: user.nickname,
          role: user.role,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt
        };
      }
    });
  }
  let locale = 'zh-CN';
  if (
    typeof ctx.session.locale !== 'undefined' &&
    ctx.session.locale !== null &&
    ctx.session.locale !== ''
  ) {
    locale = ctx.session.locale;
  } else {
    ctx.session.locale = locale;
  }
  let captchaData = '';
  if (
    typeof ctx.session.captchaData !== 'undefined' &&
    ctx.session.captchaData !== null &&
    ctx.session.captchaData !== ''
  ) {
    captchaData = ctx.session.captchaData;
  }
  ctx.state = {
    preloadedState: {
      app: {
        currentUser: currentUser,
        locale: locale
      },
      csrf: ctx.csrf,
      captchaData: captchaData,
      qiniuDomain: ENV.QINIU.DOMAIN
    },
    helpers: helpers,
    isUserSignIn: currentUser != null
  };
  // console.log(ctx.state.preloadedState.currentUser);
  await next();
}

export default {
  catchError,
  addHelper
};
