const path = require('path');
const CDN = require('../../helpers/cdn');

const CURRENT_PATH = path.resolve(__dirname);
const ROOT_PATH = path.join(__dirname, '../', '../', '../');
const PUBLIC_PATH = path.resolve(__dirname, '../', '../', '../', 'public/assets');
const ASSET_PATH = path.resolve(__dirname, '../', '../', '../', 'public/assets');
const MODULES_PATH = path.join(ROOT_PATH, './node_modules');
const SERVER_PATH = `${CDN.URL}/assets/`;
const SOURCE_PATH = path.join(ROOT_PATH, './app/frontend');

module.exports = {
  CURRENT_PATH: CURRENT_PATH,
  ROOT_PATH: ROOT_PATH,
  PUBLIC_PATH: PUBLIC_PATH,
  ASSET_PATH: ASSET_PATH,
  MODULES_PATH: MODULES_PATH,
  SERVER_PATH: SERVER_PATH,
  SOURCE_PATH: SOURCE_PATH
};
