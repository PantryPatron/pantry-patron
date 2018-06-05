const mongoose = require('mongoose');

const { Schema } = mongoose;

const StoreSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Stores', StoreSchema);
