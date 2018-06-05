const mongoose = require('mongoose');

const { Schema } = mongoose;

const StoreSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Stores', StoreSchema);
