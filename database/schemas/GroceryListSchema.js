const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GroceryListSchema = Schema({
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Items'
  }],
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  total_price: {
    type: Number,
    default: 0.00
  }
});

module.exports = mongoose.model('GroceryLists', GroceryListSchema);