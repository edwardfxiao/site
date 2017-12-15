import _ from 'lodash';
const PAGE_NAME = {
  Home: '救个急',
  Article: '文章',
  ArticleCategory: '文章列表',
  NotFound: ''
};

const LOCALE = 'zh-CN';

const HOME = 'home';
const ARTICLE = 'article';
const ARTICLE_LIST = 'article_list';
const ARTICLE_FORM = 'article_form';
const ARTICLE_CATEGORY = 'article_category';
const ARTICLE_CATEGORY_LIST = 'article_category_list';
const ARTICLE_CATEGORY_FORM = 'article_category_form';
const NOT_FOUND = 'not_found';

const ROOT_PATH = '/';
const HOME_PATH = ROOT_PATH;
const ARTICLE_PATH = `${ARTICLE}s`;
const ARTICLE_CATEGORY_PATH = `${ARTICLE_CATEGORY}s`;

const PER_PAGE = 4;

const toCamelCase = str => {
  return (capitalLize = false) => {
    let res = _.camelCase(str);
    return capitalLize
      ? _.toUpper(res.substr(0, 1)) + res.substr(1, res.length)
      : res;
  };
};

export {
  LOCALE,
  HOME,
  PAGE_NAME,
  ARTICLE,
  ARTICLE_LIST,
  ARTICLE_FORM,
  ARTICLE_CATEGORY,
  ARTICLE_CATEGORY_LIST,
  ARTICLE_CATEGORY_FORM,
  ROOT_PATH,
  HOME_PATH,
  ARTICLE_PATH,
  ARTICLE_CATEGORY_PATH,
  NOT_FOUND,
  PER_PAGE,
  toCamelCase
};
