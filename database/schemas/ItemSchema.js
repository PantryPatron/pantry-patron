const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model('Items', ItemSchema);
