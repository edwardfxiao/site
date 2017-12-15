'use strict'
var mongoose = require('../db/index');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var id = mongoose.Types.ObjectId('56cb91bdc3464f14678934ca');

var articleList = [{
  title:' title',
  uniqueKey: 'title',
  author: 'admin',
  preface: 'preface',
  desc: 'desc',
  content: 'content',
  cover: '',
  type: 0,
  tag: '',
  isBanned: false,
  isPrivate: false,
  isAdminOnly: true,
  articleCategory: 'jottings',
  sequence: 1,
  createdBy: id,
  updatedBy: id,
}];
var ArticleSchema = new Schema({
  title: { type: String, required: true },
  uniqueKey: { type: String, required: true },
  author: { type: String, required: true },
  preface: { type: String },
  desc: { type: String },
  content: { type: String, required: true },
  cover: { type: String },
  type: { type: String },
  tag: { type: String },
  isBanned: { type: Boolean },
  isPrivate: { type: Boolean },
  isAdminOnly: { type: Boolean },
  articleCategory: { type: String, required: true },
  sequence: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: ObjectId, ref: 'Users' },
  updatedBy: { type: ObjectId, ref: 'Users' },
});
var ArticleSchema = mongoose.model('Articles', ArticleSchema);

exports.up = function(next) {
  ArticleSchema.insertMany(articleList, function(error, docs) {});
  next();
};

exports.down = function(next) {
  ArticleSchema.remove({}, function (err) {});
  next();
};