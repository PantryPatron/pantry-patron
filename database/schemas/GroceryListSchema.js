const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroceryListSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'ItemHistories',
  }],
  total_price: {
    type: Number,
    default: 0.00,
  },
  store_id: {
    type: Schema.Types.ObjectId,
    ref: 'Stores',
  },
});

module.exports = mongoose.model('GroceryLists', GroceryListSchema);
