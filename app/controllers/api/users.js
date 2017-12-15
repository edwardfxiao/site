import models from '../../models/index';
import _ from 'lodash';
import svgCaptcha from 'svg-captcha';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const login = async(ctx, _next) => {
  let clientIp = ctx.request.ip;
  // ctx.cache.set('login:ip-' + clientIp, 0);
  // ctx.session.captcha = null;
  // ctx.session.captchaData = null;
  // return;
  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  let LANG_USER = require('../../locales/' + ctx.session.locale + '/user');

  let data = {};
  let msg = '';

  let {
    username,
    password,
    captchaCode,
  } = ctx.request.body;

  let isSeveralTimes = false;
  let isInvalidParams = false;
  let isInvalidPassword = false;

  let triedTimes = await ctx.cache.get('login:ip-' + clientIp);
  if (_.isNull(triedTimes)) {
    triedTimes = 0;
    ctx.cache.set('login:ip-' + clientIp, triedTimes);
  } else {
    if (triedTimes > 2) {
      isSeveralTimes == true;
      if (triedTimes === 3) {
        var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
        ctx.session.captcha = captcha.text;
        ctx.session.captchaData = captcha.data;
      } else {
        if (!_.isUndefined(ctx.session.captcha) && !_.isNull(ctx.session.captcha)) {
          if (ctx.session.captcha !== captchaCode) {
            var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
            ctx.session.captcha = captcha.text;
            ctx.session.captchaData = captcha.data;
            data['captcha'] = ctx.session.captchaData;
            console.log('gen: ' + ctx.session.captcha);
            console.log('user: ' + captchaCode);
            if (captchaCode === '') {
              msg = LANG_MESSAGE['please-enter-captcha'];
              ctx.body = { code: 1, data: data, msg: msg };
              return false;
            } else {
              if (ctx.session.captcha !== captchaCode) {
                msg = LANG_MESSAGE['invalid-captcha'];
                ctx.body = { code: 1, data: data, msg: msg };
                return false;
              }
            }
          }
        }
      }
    }
  }

  if (!isSeveralTimes) {
    if (_.isUndefined(username) || username === '') {
      isInvalidParams = true;
      msg = LANG_MESSAGE.invalid + LANG_USER.username;
    }
    if (_.isUndefined(password) || password === '') {
      isInvalidParams = true;
      msg = LANG_MESSAGE.invalid + LANG_USER.password;
    }
  }

  if (!isSeveralTimes && !isInvalidParams) {
    let currentUser;
    let user;
    let findByNickname;
    let findByPhone;
    let findByEmail;

    findByNickname = await models.User.findByNickName(username);
    if (!findByNickname.length) {
      findByPhone = await models.User.findByPhone(username);
      if (!findByPhone.length) {
        findByEmail = await models.User.findByEmail(username);
      }
    }

    if (findByNickname && findByNickname.length) {
      user = findByNickname[0];
    } else if (findByPhone && findByPhone.length) {
      user = findByPhone[0];
    } else if (findByEmail && findByEmail.length) {
      user = findByEmail[0];
    }

    if (user) {
      let isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        currentUser = {
          'id': user._id,
          'nickname': user.nickname,
          'role': user.role,
          'phone': user.phone,
          'email': user.email,
          'avatar': user.avatar,
          'createdAt': user.createdAt,
        }
        ctx.session.userId = user._id;
        data['currentUser'] = currentUser;
      } else {
        isInvalidPassword = true;
        msg = LANG_MESSAGE['invalid-password'];
      }
    } else {
      isInvalidPassword = true;
      msg = LANG_MESSAGE['invalid-password'];
    }
  }

  if (!isSeveralTimes && !isInvalidParams && !isInvalidPassword) {
    ctx.cache.set('login:ip-' + clientIp, 0);
    ctx.session.captcha = null;
    ctx.session.captchaData = null;
    msg = LANG_MESSAGE['welcome-back'] + ', ' + data['currentUser'].nickname;
    ctx.body = { code: 0, data: data, msg: msg };
    return true;
  } else {
    ctx.cache.set('login:ip-' + clientIp, triedTimes + 1);
    ctx.body = { code: 1, data: data, msg: msg };
    var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
    ctx.session.captcha = captcha.text;
    ctx.session.captchaData = captcha.data;
    return false;
  }
};

const signup = async(ctx, _next) => {
  let clientIp = ctx.request.ip;
  // ctx.cache.set('login:ip-' + clientIp, 0);
  // ctx.session.captcha = null;
  // ctx.session.captchaData = null;
  // return;
  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  let LANG_USER = require('../../locales/' + ctx.session.locale + '/user');
  let LANG_ACTION = require('../../locales/' + ctx.session.locale + '/action');

  let data = {};
  let msg = '';
  let hash;

  let {
    id,
    nickname,
    role,
    password,
    phone,
    email,
    avatar,
    verifyCode,
    captchaCode,
  } = ctx.request.body;

  let isSeveralTimes = false;
  let isInvalidParams = false;
  let isDuplicateUser = false;

  let triedTimes = await ctx.cache.get('signup:ip-' + clientIp);
  if (_.isNull(triedTimes)) {
    triedTimes = 0;
    ctx.cache.set('signup:ip-' + clientIp, triedTimes);
  } else {
    if (triedTimes > 2) {
      isSeveralTimes == true;
      if (triedTimes === 3) {
        var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
        ctx.session.captcha = captcha.text;
        ctx.session.captchaData = captcha.data;
      } else {
        if (!_.isUndefined(ctx.session.captcha) && !_.isNull(ctx.session.captcha)) {
          if (ctx.session.captcha !== captchaCode) {
            var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
            ctx.session.captcha = captcha.text;
            ctx.session.captchaData = captcha.data;
            data['captcha'] = ctx.session.captchaData;
            console.log('gen: ' + ctx.session.captcha);
            console.log('user: ' + captchaCode);
            if (captchaCode === '') {
              msg = LANG_MESSAGE['please-enter-captcha'];
              ctx.body = { code: 5, data: data, msg: msg }; //5: captcha
              return false;
            } else {
              if (ctx.session.captcha !== captchaCode) {
                msg = LANG_MESSAGE['invalid-captcha'];
                ctx.body = { code: 5, data: data, msg: msg }; //5: captcha
                return false;
              }
            }
          }
        }
      }
    }
  }

  if (!isSeveralTimes) {
    if (_.isUndefined(nickname) || nickname === '') {
      isInvalidParams = true;
      msg = LANG_MESSAGE.invalid + LANG_USER.nickname;
    }
    if ((_.isUndefined(phone) || phone === '') && (_.isUndefined(email) || email === '')) {
      isInvalidParams = true;
      msg = LANG_MESSAGE.invalid + LANG_USER['phone-or-email'];
    }

    // TODO: when I have money
    // if (_.isUndefined(verifyCode) || verifyCode === '') {
    //   isInvalidParams = true;
    //   msg = LANG_MESSAGE.invalid + LANG_USER['verify-code'];
    // }
    if (id == '') {
      if (_.isUndefined(password) || password === '') {
        isInvalidParams = true;
        msg = LANG_MESSAGE.invalid + LANG_USER.password;
      }
    }
  }

  let code = 0;

  if (!isSeveralTimes && !isInvalidParams) {
    let res;
    res = await models.User.findByNickName(nickname);
    if (res.length) {
      if ((id == '') || (id != '' && res[0]['_id'] != id)) {
        isDuplicateUser = true;
        code = 1;
        msg = LANG_USER.nickname + LANG_MESSAGE['already-exist'];
      }
    }
    if (!isDuplicateUser) {
      if (phone != '') {
        res = await models.User.findByPhone(phone);
        if (res.length) {
          if ((id == '') || (id != '' && res[0]['_id'] != id)) {
            isDuplicateUser = true;
            code = 2;
            msg = LANG_USER.phone + LANG_MESSAGE['already-exist'];
          }
        }
      }
    }
    if (!isDuplicateUser) {
      if (email != '') {
        res = await models.User.findByEmail(email);
        if (res.length) {
          if ((id == '') || (id != '' && res[0]['_id'] != id)) {
            isDuplicateUser = true;
            code = 3;
            msg = LANG_USER.email + LANG_MESSAGE['already-exist'];
          }
        }
      }
    }
  }

  if (!isSeveralTimes && !isInvalidParams && !isDuplicateUser) {
    let result;
    if (id == '') {
      var usersList = [{
        nickname: nickname,
        role: role !== '' ? role : 'user',
        phone: phone,
        email: email,
        avatar: avatar,
        password: bcrypt.hashSync(password, saltRounds),
      }];
      await models.User.insertMany(usersList, (err, docs) => {
        if (!_.isNull(err)) {
          result = false;
          code = 4; // faild
        } else {
          result = true;
          code = 0;
          msg = LANG_USER['signup'] + LANG_MESSAGE['successfully'] + ', ' + LANG_MESSAGE['please'] + LANG_USER['login'];
        }
      });
      ctx.cache.set('signup:ip-' + clientIp, 0);
      ctx.session.captcha = null;
      ctx.session.captchaData = null;
      ctx.body = { code: code, data: data, msg: msg };
      return true;
    } else {
      let currentUser;
      let currentUserRes = await models.User.findById(id);
      if (currentUserRes.length) {
        let user = currentUserRes[0];
        let isDiffPassword = await bcrypt.compare(password, user.password);
        currentUser = {
          'id': user._id,
          'nickname': user.nickname,
          'role': user.role,
          'phone': user.phone,
          'email': user.email,
          'avatar': user.avatar,
          'password': user.password,
          'createdAt': user.createdAt,
        }
      }
      if (currentUser) {
        let hash;
        console.log(password);
        if (password == '') {
          hash = currentUser.password;
        } else {
          hash = bcrypt.hashSync(password, saltRounds);
        }
        let newData = {
          id: id,
          nickname: nickname,
          role: role !== '' ? role : 'user',
          phone: phone,
          email: email,
          avatar: avatar,
          password: hash,
        }
        await models.User.findOneAndUpdate({ _id: id }, newData, { upsert: true }).exec((err, doc) => {
          if (!_.isNull(err)) {
            result = false;
            code = 4; // faild
          } else {
            result = true;
            code = 0;
            msg = LANG_ACTION['update'] + LANG_MESSAGE['successfully'];
            data['currentUser'] = newData;
          }
        });
      }
      ctx.cache.set('signup:ip-' + clientIp, 0);
      ctx.session.captcha = null;
      ctx.session.captchaData = null;
      ctx.body = { code: code, data: data, msg: msg };
      return true;
    }
  } else {
    ctx.cache.set('signup:ip-' + clientIp, triedTimes + 1);
    ctx.body = { code: code, data: data, msg: msg };
    var captcha = svgCaptcha.create({ 'width': 100, 'height': 30, 'fontSize': 40 });
    ctx.session.captcha = captcha.text;
    ctx.session.captchaData = captcha.data;
    return false;
  }

};

const logout = async(ctx, _next) => {
  ctx.session.userId = null;
  ctx.body = { code: 0, data: {}, msg: '' };
};

const remove = async(ctx, _next) => {

  let code = 0;
  let data = {};
  let msg = '';

  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  let LANG_USER = require('../../locales/' + ctx.session.locale + '/user');

  let {
    id,
  } = ctx.request.body;

  await models.User.findByIdAndRemove(id).exec((err, doc) => {
    console.log(doc);
  });

  ctx.session.userId = null;
  ctx.body = { code: code, data: data, msg: msg };
};

const sendVerifyCode = async(ctx, _next) => {
  ctx.session.userId = null;
  ctx.body = { code: 0, data: {}, msg: '' };
};

const captcha = async(ctx, _next) => {
  let data = {};
  let msg = '';
  var svgCaptcha = require('svg-captcha');
  var captcha = svgCaptcha.create({ 'width': 100, 'height': 28, 'fontSize': 40 });
  ctx.session.captcha = captcha.text;
  ctx.session.captchaData = captcha.data;
  data['captcha'] = captcha.data;
  console.log(captcha.text);
  ctx.body = { code: 0, data: data, msg: msg };
  return true;
}

export default {
  login,
  signup,
  logout,
  remove,
  sendVerifyCode,
  captcha,
};
