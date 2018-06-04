// Host all database functionality

const mongoose = require('mongoose');

// establish connection
const uri = process.env.MONGOOSE_URI || 'mongodb://localhost/pantry-patron';
mongoose.connect(uri);
const db = mongoose.connection;
// feedback from database connection
db.on('error', () => {
  console.log('No connection to database');
});
db.once('open', () => {
  console.log('Database connection established');
});
// import collections here
const User = require('./schemas/UserSchema.js');
const GroceryList = require('./schemas/GroceryListSchema.js');
const Items = require('./schemas/ItemSchema.js');
const Category = require('./schemas/CategorySchema.js');
const Store = require('./schemas/StoreSchema.js');

const save = (user) => {
  const test = new User(user);

  test.save((err) => {
    if (err) throw err;
    console.log(test);
  });
  console.log('inside save function (DB)');
};

const find = () => {
  console.log('inside find function (DB)');
};

module.exports.save = save;
module.exports.find = find;
module.exports.storeSearch = Store.find;
module.exports.storeSave = Store.save;
