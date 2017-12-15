import { SET_PORTFOLIO_TYPE, SET_SLIDE_MODAL_CONTENT_NAME } from '../actions/home';

const initialState = {
  portfolioType: 'graphic_design',
  slideModalContentName: 'Empty'
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case SET_PORTFOLIO_TYPE:
      return {
        ...state,
        portfolioType: action.portfolioType
      };
    case SET_SLIDE_MODAL_CONTENT_NAME:
      return {
        ...state,
        slideModalContentName: action.slideModalContentName
      };
    default:
      return state;
  }
}

home.reducer = 'home';
