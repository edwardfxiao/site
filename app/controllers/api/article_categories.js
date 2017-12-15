import models from '../../models/index';
import helper from '../helper';
import _ from 'lodash';

const index = async(ctx, _next) => {
  let {
    page,
    perPage,
  } = ctx.request.query;
  if (_.isUndefined(page) || page === '') {
    page = 1;
  }
  if (_.isUndefined(perPage) || perPage === '') {
    perPage = 15;
  }
  page = _.toNumber(page);
  perPage = _.toNumber(perPage);
  let query;
  const currentUser = ctx.state.preloadedState.currentUser;
  if (!_.isNull(currentUser) && currentUser.role == 'admin'){
    query = {uniqueKey: {'$ne': 'root'}};
  }
  else{
    query = { isBanned: false, isPrivate: false, $and:[{isAdminOnly: false}] };
  }
  let code = 0;
  let data = [];
  let pages = 0;
  let select = ['title', 'uniqueKey', 'author', 'preface', 'desc', 'content', 'articleCategory', 'sequence', 'cover', 'type', 'level', 'tag', 'isBanned', 'isPrivate', 'isAdminOnly', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
  let populate = 'createdBy';
  let sort = { sequence: 1 };
  let res = await helper.getArticleCategories(query, select, sort, true, populate, page, perPage);
  data = res.data;
  pages = res.pages;
  ctx.body = { code, data, page, pages };
};

const show = async(ctx, _next) => {
  let {
    id,
  } = ctx.params;
  let query = {uniqueKey: id};
  let code = 0;
  let data = [];
  let select = ['title', 'uniqueKey', 'author', 'preface', 'desc', 'content', 'articleCategory', 'sequence', 'cover', 'type', 'level', 'tag', 'isBanned', 'isPrivate', 'isAdminOnly', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
  let populate = 'createdBy';
  let res = await helper.getArticleCategories(query, select, '', true, populate);
  let ObjectId = require('mongoose').Types.ObjectId;
  if (!res.data.length && ObjectId.isValid(id)){
    query = { _id: id};
    res = await helper.getArticleCategories(query, select, '', true, populate);
  }
  data = res.data;
  ctx.body = { code, data };
};

const create = async(ctx, _next) => {
  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  let LANG_ARTICLE = require('../../locales/' + ctx.session.locale + '/article');
  let LANG_GENERAL = require('../../locales/' + ctx.session.locale + '/general');
  const currentUser = ctx.state.preloadedState.currentUser;
  let mongoose = require('mongoose');
  let userId = mongoose.Types.ObjectId(currentUser.id);
  let {
    title,
    uniqueKey,
    author,
    preface,
    desc,
    content,
    cover,
    type,
    level,
    tag,
    isBanned,
    isPrivate,
    isAdminOnly,
    articleCategory,
    sequence,
  } = ctx.state.articleParams;
  let data = {
    title,
    uniqueKey,
    author,
    preface,
    desc,
    content,
    cover,
    type,
    level,
    tag,
    isBanned,
    isPrivate,
    isAdminOnly,
    articleCategory,
    sequence: _.toNumber(sequence),
    createdBy: userId,
  };
  let code = 0;
  let msg = '';
  let newUniqueKey = '';
  let isDuplicate = false;
  await models.ArticleCategory.findOne({title: title}, (err, res) => {
    if (err) {
      code = 1;
      throw err;
    }
    if (!_.isNull(res)){
      isDuplicate = true;
    }
  });
  if (isDuplicate){
    code = 2;
    msg = LANG_ARTICLE['title'] + LANG_GENERAL['space-en'] + LANG_MESSAGE['already-exist'];
  }
  else{
    await models.ArticleCategory.findOne({uniqueKey: uniqueKey}, (err, res) => {
      if (err) {
        code = 1;
        throw err;
      }
      if (!_.isNull(res)){
        isDuplicate = true;
      }
    });
  }
  if (isDuplicate){
    code = 3;
    msg = LANG_ARTICLE['unique-key'] + LANG_GENERAL['space-en'] + LANG_MESSAGE['already-exist'];
  }
  else{
    await models.ArticleCategory.create(data, (err, res) => {
      if (err) {
        code = 1;
        throw err;
      }
      newUniqueKey = res.uniqueKey;
      // saved!
    });
  }
  ctx.body = { code, uniqueKey: newUniqueKey, msg };
};

const update = async(ctx, _next) => {
  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  let LANG_ARTICLE = require('../../locales/' + ctx.session.locale + '/article');
  let LANG_GENERAL = require('../../locales/' + ctx.session.locale + '/general');
  const currentUser = ctx.state.preloadedState.currentUser;
  let mongoose = require('mongoose');
  let userId = mongoose.Types.ObjectId(currentUser.id);
  let {
    id,
    title,
    uniqueKey,
    author,
    preface,
    desc,
    content,
    cover,
    type,
    level,
    tag,
    isBanned,
    isPrivate,
    isAdminOnly,
    articleCategory,
    sequence,
  } = ctx.state.articleParams;
  let data = {
    id,
    title,
    uniqueKey,
    author,
    preface,
    desc,
    content,
    cover,
    type,
    level,
    tag,
    isBanned,
    isPrivate,
    isAdminOnly,
    articleCategory,
    sequence,
    createdBy: userId,
  };
  let code = 0;
  let msg = '';
  let isDuplicate = false;
  await models.ArticleCategory.findOne({title: title}, (err, res) => {
    if (err) {
      code = 1;
      throw err;
    }
    if (!_.isNull(res) && res._id != id){
      isDuplicate = true;
    }
  });
  if (isDuplicate){
    code = 2;
    msg = LANG_ARTICLE['title'] + LANG_GENERAL['space-en'] + LANG_MESSAGE['already-exist'];
  }
  else{
    await models.ArticleCategory.findOne({uniqueKey: uniqueKey}, (err, res) => {
      if (err) {
        code = 1;
        throw err;
      }
      if (!_.isNull(res) && res._id != id){
        isDuplicate = true;
      }
    });
  }
  if (isDuplicate){
    code = 3;
    msg = LANG_ARTICLE['unique-key'] + LANG_GENERAL['space-en'] + LANG_MESSAGE['already-exist'];
  }
  else{
    await models.ArticleCategory.update({ _id: id }, data, { multi: false }, (err, res) => {
      if (err) {
        console.log(err);
        code = 1;
        throw err;
      }
      // saved!
    })
  }
  ctx.body = { code, uniqueKey, msg };
};

const remove = async(ctx, _next) => {
  let code = 0;
  let id = ctx.params.id;
  await models.ArticleCategory.findOneAndRemove({ _id: id }, (err, res) => {
    if (err) {
      console.log(err);
      code = 1;
      throw err;
    }
    // deleted!
  })
  ctx.body = { code, id };
}

const checkLogin = async(ctx, next) => {
  if (!ctx.state.isUserSignIn) {
    ctx.status = 302;
    ctx.redirect('/');
    return;
  }
  await next();
};

const checkArticleCategoryOwner = async(ctx, next) => {
  let LANG_MESSAGE = require('../../locales/' + ctx.session.locale + '/message');
  const currentUser = ctx.state.preloadedState.currentUser;
  let id = ctx.params.id;
  let select = ['_id', 'createdBy'];
  let populate = 'createdBy';
  let query = { _id: id };
  let res = await helper.getArticleCategories(query, select, '', true, populate);
  if (res.data.length) {
    if (res.data[0].createdBy['_id'].equals(currentUser.id)) {
      await next();
    } else {
      ctx.body = { code: 1, data: {}, msg: LANG_MESSAGE['error-on-unauthorized'] };
    }
  } else {
    ctx.body = { code: 1, data: {}, msg: LANG_MESSAGE['error-on-unauthorized'] };
  }
  return;
};

const checkParamsBody = async(ctx, next) => {
  const body = ctx.request.body;
  let {
    id,
    title,
    uniqueKey,
    author,
    preface,
    desc,
    content,
    cover,
    type,
    level,
    tag,
    isBanned,
    isPrivate,
    isAdminOnly,
    articleCategory,
    sequence,
  } = body;
  if (title == '') {
    return false;
  }
  ctx.state.articleParams = {
    id: id,
    title: title,
    uniqueKey: uniqueKey,
    author: author,
    preface: preface,
    desc: desc,
    content: content,
    cover: cover,
    type: type,
    level: level,
    tag: tag,
    isBanned: isBanned,
    isPrivate: isPrivate,
    isAdminOnly: isAdminOnly,
    articleCategory: articleCategory,
    sequence: sequence,
  };
  await next();
};

const getCategorieOptions = async(ctx, _next) => {
  let code = 0;
  let data = [];
  let select = ['title', 'uniqueKey'];
  let populate = 'createdBy';
  let query = { isBanned: false, isPrivate: false };
  let sort = { updatedBy: -1 };
  let res = await helper.getArticleCategories(query, select, sort, true, populate);
  data = res.data;
  ctx.body = { code, data };
};

export default {
  getCategorieOptions,
  index,
  show,
  create,
  update,
  remove,
  checkLogin,
  checkArticleCategoryOwner,
  checkParamsBody,
};
