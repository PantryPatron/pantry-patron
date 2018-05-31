const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = Schema({
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  }
});

module.exports = mongoose.model('Items', ItemSchema);
