const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategorySchema = Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Categories', CategorySchema);