const mongoose = require('mongoose');

const { Schema } = mongoose;

const StoreSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Items',
  }],
});

module.exports = mongoose.model('Store', StoreSchema);
