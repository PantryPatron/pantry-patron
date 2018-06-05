const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemHistorySchema = Schema({
  price: {
    type: Number,
    default: 0,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: 'Items',
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('ItemHistories', ItemHistorySchema);
