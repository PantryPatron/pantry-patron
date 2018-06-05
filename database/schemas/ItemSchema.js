const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Items', ItemSchema);
