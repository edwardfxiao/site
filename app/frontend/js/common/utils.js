const getLocalStorageToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && accessToken != '') {
    return accessToken;
  }
  return false;
};

const getParameterByName = (name, url) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!url) url = window.location.href;
  name = name.replace(/\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const logout = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('_cid');
  window.location.reload();
};

const scroll = () => {
  if (typeof window === 'undefined') {
    return;
  }
  setTimeout(() => {
    window.scrollTo(0, 0.1);
  }, 100);
};

const isClientSide = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  return true;
};

export {
  getLocalStorageToken,
  getParameterByName,
  logout,
  scroll,
  isClientSide
};
