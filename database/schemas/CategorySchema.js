const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Categories', CategorySchema);
