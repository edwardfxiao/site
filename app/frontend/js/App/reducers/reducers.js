import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';

export function locale(locale = DEFAULT_STATE.locale, action) {
  switch (action.type) {
    case ACTION.SET_LOCALE:
      return action.locale
    default:
      return locale;
  }
}

export function currentUser(currentUser = DEFAULT_STATE.currentUser, action) {
  switch (action.type) {
    case ACTION.SET_CURRENT_USER:
      return action.currentUser
    default:
      return currentUser;
  }
}

export function isFetching(isFetching = DEFAULT_STATE.isFetching, action) {
  switch (action.type) {
    case ACTION.SET_IS_FETCHING:
      return action.isFetching;
    default:
      return isFetching;
  }
}

export function modalContentName(modalContentName = DEFAULT_STATE.modalContentName, action) {
  switch (action.type) {
    case ACTION.SET_MODAL_CONTENT_NAME:
      return action.modalContentName;
    default:
      return modalContentName;
  }
}

export function slideModalContentName(slideModalContentName = DEFAULT_STATE.slideModalContentName, action) {
  switch (action.type) {
    case ACTION.SET_SLIDE_MODAL_CONTENT_NAME:
      return action.slideModalContentName;
    default:
      return slideModalContentName;
  }
}

export function isSendVerifyCode(isSendVerifyCode = DEFAULT_STATE.isSendVerifyCode, action) {
  switch (action.type) {
    case ACTION.SET_IS_SEND_VERIFY_CODE:
      return action.isSendVerifyCode;
    default:
      return isSendVerifyCode;
  }
}

export function captcha(captcha = DEFAULT_STATE.captcha, action) {
  switch (action.type) {
    case ACTION.SET_IS_CAPTCHA:
      return action.captcha;
    default:
      return captcha;
  }
}

export function article(article = DEFAULT_STATE.article, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE:
      return action.article;
    default:
      return article;
  }
}

export function articleCategoryOptions(articleCategoryOptions = DEFAULT_STATE.articleCategoryOptions, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_CATEGORY_OPTIONS:
      return action.articleCategoryOptions;
    default:
      return articleCategoryOptions;
  }
}

export function articleList(articleList = DEFAULT_STATE.articleList, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_LIST:
      return action.articleList;
    default:
      return articleList;
  }
}

export function articleListCurrentPage(articleListCurrentPage = DEFAULT_STATE.articleListCurrentPage, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_LIST_CURRENT_PAGE:
      return action.articleListCurrentPage;
    default:
      return articleListCurrentPage;
  }
}


export function articleListTotalPage(articleListTotalPage = DEFAULT_STATE.articleListTotalPage, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_LIST_TOTAL_PAGE:
      return action.articleListTotalPage;
    default:
      return articleListTotalPage;
  }
}

export function articleCategoryList(articleCategoryList = DEFAULT_STATE.articleCategoryList, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_CATEGORY_LIST:
      return action.articleCategoryList;
    default:
      return articleCategoryList;
  }
}

export function articleCategory(articleCategory = DEFAULT_STATE.articleCategory, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_CATEGORY:
      return action.articleCategory;
    default:
      return articleCategory;
  }
}

export function articleCategoryListCurrentPage(articleCategoryListCurrentPage = DEFAULT_STATE.articleCategoryListCurrentPage, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_CATEGORY_LIST_CURRENT_PAGE:
      return action.articleCategoryListCurrentPage;
    default:
      return articleCategoryListCurrentPage;
  }
}

export function articleCategoryListTotalPage(articleCategoryListTotalPage = DEFAULT_STATE.articleCategoryListTotalPage, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_CATEGORY_LIST_TOTAL_PAGE:
      return action.articleCategoryListTotalPage;
    default:
      return articleCategoryListTotalPage;
  }
}

export function portfolioType(portfolioType = DEFAULT_STATE.portfolioType, action) {
  switch (action.type) {
    case ACTION.SET_PORTFOLIO_TYPE:
      return action.portfolioType;
    default:
      return portfolioType;
  }
}

export function isNotFound(isNotFound = DEFAULT_STATE.isNotFound, action) {
  switch (action.type) {
    case ACTION.SET_IS_NOT_FOUND:
      return action.isNotFound;
    default:
      return isNotFound;
  }
}
