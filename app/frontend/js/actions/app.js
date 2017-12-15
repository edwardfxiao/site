export const SET_LOCALE = 'SET_LOCALE';
export const setLocale = locale => ({
  type: SET_LOCALE,
  locale
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
});

export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const setIsFetching = isFetching => ({
  type: SET_IS_FETCHING,
  isFetching
});

export const SET_IS_POSTING = 'SET_IS_POSTING';
export const setIsPosting = isPosting => ({
  type: SET_IS_POSTING,
  isPosting
});

export const SET_IS_NOT_FOUND = 'SET_IS_NOT_FOUND';
export const setIsNotFound = isNotFound => ({
  type: SET_IS_NOT_FOUND,
  isNotFound
});

export const SET_IS_COMPONENT_READY = 'SET_IS_COMPONENT_READY';
export const setIsComponentReady = isComponentReady => ({
  type: SET_IS_COMPONENT_READY,
  isComponentReady
});

export const SET_MODAL_CONTENT_NAME = 'SET_MODAL_CONTENT_NAME';
export const setModalContentName = (modalContentName) => ({
  type: SET_MODAL_CONTENT_NAME,
  modalContentName
});


export const SET_SHOW_MOBILE_MENU = 'SET_SHOW_MOBILE_MENU';
export const setShowMobileMenu = (showMobileMenu) => ({
  type: SET_SHOW_MOBILE_MENU,
  showMobileMenu
});
