import {
  LOCALE,
  ARTICLE_PATH,
  ARTICLE_CATEGORY_PATH,
  toCamelCase
} from '../consts/index.js';
import {
  SET_LOCALE,
  SET_CURRENT_USER,
  SET_IS_FETCHING,
  SET_IS_POSTING,
  SET_IS_NOT_FOUND,
  SET_IS_COMPONENT_READY,
  SET_MODAL_CONTENT_NAME,
  SET_SHOW_MOBILE_MENU,
} from '../actions/app.js';

const initialState = {
  locale: LOCALE,
  currentUser: null,
  isFetching: false,
  isPosting: false,
  isNotFound: false,
  isComponentReady: false,
  modalContentName: 'Empty',
  showMobileMenu: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SET_IS_POSTING:
      return {
        ...state,
        isPosting: action.isPosting
      };
    case SET_IS_NOT_FOUND:
      return {
        ...state,
        isNotFound: action.isNotFound
      };
    case SET_IS_COMPONENT_READY:
      return {
        ...state,
        isComponentReady: action.isComponentReady
      };
    case SET_MODAL_CONTENT_NAME:
      return {
        ...state,
        modalContentName: action.modalContentName
      };
    case SET_SHOW_MOBILE_MENU:
      return {
        ...state,
        showMobileMenu: action.showMobileMenu
      };
    default:
      return state;
  }
};

export default app;
