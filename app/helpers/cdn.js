const ENV = require('../../.env');

const APP_NAME = ENV.APP_NAME;
const CDN = ENV.QINIU.DOMAIN;
const CDN_URL = `${CDN}/${APP_NAME}`;

const URL = CDN_URL;

module.exports = {
  URL: CDN ? URL : ''
}