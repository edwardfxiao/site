import ENV from '../../.env.js';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import CDN from './cdn';

let manifest = {};
let vendorManifest = {};
let manifestPath = path.resolve(__dirname, '../', '../', 'public', 'assets', 'rev-manifest.json');
let vendorManifestPath = path.resolve(__dirname, '../', '../', 'public', 'assets', 'manifest_vendor.json');
if (fs.existsSync(manifestPath)) {
  manifest = require('../../public/assets/rev-manifest.json');
  if (ENV.APP_ENV == 'production'){
    vendorManifest = require('../../public/assets/manifest_vendor.json');
  }
}

function getAssetName(asset) {
  return manifest[asset];
}

exports.assetUrl = (assetsName) => {
  const publicAsset = getAssetName(assetsName);
  if (!publicAsset) {
    let vendorAsset = vendorManifest[assetsName];
    if (!vendorAsset) {
      vendorAsset = assetsName;
    }
    if (ENV.APP_ENV == 'production(remove)') {
      return `http://${CDN.URL}/assets/${vendorAsset}`;
    } else {
      return `/assets/${vendorAsset}`;
    }
  } else {
    if (ENV.APP_ENV == 'production(remove)') {
      return `http://${CDN.URL}/assets/${publicAsset}`;
    } else {
      return `/assets/${publicAsset}`;
    }
  }
  return publicAsset;
};

exports.isActive = function(action, param) {
  let active = '';
  if (action == param) {
    active = 'active';
  }
  return active;
};

exports.timeAgo = function(date) {
  date = moment(date);
  return date.fromNow();
};

exports.formatDate = function(date) {
  date = moment(date);
  return date.format('YYYY-MM-DD HH:mm');
};
