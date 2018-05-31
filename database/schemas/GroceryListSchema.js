const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GroceryListSchema = Schema({
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Items'
  }],
  name: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  total_price: Number
});

module.exports = mongoose.model('GroceryLists', GroceryListSchema);