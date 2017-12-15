import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// define a schema
const UserSchema = new Schema({
  nickname: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  avatar: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// assign a function to the "methods" object of our UserSchema
// UserSchema.methods.findSimilarTypes = function(cb) {
//   return this.model('User').find({ type: this.type }, cb);
// };

UserSchema.statics.findById = function(val, cb) {
  return this.find({ _id: val }, cb);
};

UserSchema.query.byName = function(val) {
  return this.find({ name: new RegExp(val, 'i') });
};

UserSchema.statics.findByNickName = function(val, cb) {
  return this.find({ nickname: val }, cb);
};

UserSchema.statics.findByPhone = function(val, cb) {
  return this.find({ phone: val }, cb);
};

UserSchema.statics.findByEmail = function(val, cb) {
  return this.find({ email: val }, cb);
};

UserSchema.statics.findAll = function(val, cb) {
  return this.find({}, cb);
};

const User = mongoose.model('Users', UserSchema);

export default User;