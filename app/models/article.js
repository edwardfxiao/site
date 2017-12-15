import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// define a schema
const ArticleSchema = new Schema({
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

ArticleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('Articles', ArticleSchema);

// ArticleSchema.statics.findAll = function(val, cb) {
//   return this.find({ _id: val }, cb);
// };

export default Article;