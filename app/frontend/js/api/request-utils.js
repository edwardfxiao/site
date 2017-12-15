import axios from 'axios';
import qs from 'qs';
import _ from 'LODASH';

let baseURL;
let _csrf;

if (typeof window != 'undefined') {
  baseURL = window.BASE_URL;
  _csrf = window.__PRELOADED_STATE__.csrf;
}
axios.defaults.baseURL = baseURL;
const request = (url, method, data, contentType = 'application/x-www-form-urlencoded') => {
  // axios.defaults.baseURL = url;
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['csrf-token'] = _csrf;
  axios.defaults.headers.post['Content-Type'] = contentType;
  if (data instanceof FormData) {
    data.append('_csrf', _csrf);
  } else {
    data['_csrf'] = _csrf;
  }
  return axios[method](url, data);
};

const fetch = (url, data, config) => {
  return request(url, 'get', data, config);
};

const post = (url, data, config) => {
  return request(url, 'post', data, config);
};

const put = (url, data, config) => {
  return request(url, 'put', data, config);
};

const deleteItem = url => {
  return request(url, 'delete');
};

export { fetch, post, put, deleteItem };
