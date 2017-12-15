import models from '../models/index';

const getArticles = async(query = '', select, sort = '', lean = true, populate = '', page = 0, perPage = 0) => {
  let data = [];
  let pages;
  let options = {
    select,
    sort,
    lean,
  };
  if (populate != '') {
    options['populate'] = populate;
  }
  if (page != 0) {
    options['page'] = page;
  }
  if (perPage != 0) {
    options['limit'] = perPage;
  }
  await models.Article.paginate(query, options).then((result) => {
    if (result.docs.length) {
      data = result.docs;
      pages = result.pages;
    }
  });
  let result = {
    data,
    pages,
  }
  return result;
}

const getArticleCategories = async(query = '', select, sort = '' , lean = true, populate = '', page = 0, perPage = 0) => {
  let data = [];
  let pages;
  let options = {
    select,
    sort,
    lean,
  };
  if (populate != ''){
    options['populate'] = populate;
  }
  if (page != 0) {
    options['page'] = page;
  }
  if (perPage != 0) {
    options['limit'] = perPage;
  }
  await models.ArticleCategory.paginate(query, options).then((result) => {

    if (result.docs.length) {
      data = result.docs;
      pages = result.pages;
    }
  });
  let result = {
    data,
    pages,
  }
  return result;
}

export default {
  getArticles,
  getArticleCategories,
};
