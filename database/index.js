// Host all database functionality

const mongoose = require('mongoose');

// establish connection
const uri = process.env.MONGOOSE_URI || 'mongodb://localhost/pantry-patron'
mongoose.connect(uri);
const db = mongoose.connection;
// feedback from database connection
db.on('error', function() {
  console.log('No connection to database');
});
db.once('open',function() {
  console.log('Database connection established');
});
// import collections here
const User = require('./schemas/UserSchema.js');
const GroceryList = require('./schemas/GroceryListSchema.js');
const Items = require('./schemas/ItemSchema.js');
const Category = require('./schemas/CategorySchema.js');

var save = function(user) {
  var test = new User(user);

  test.save(function(err) {
    if(err) throw err;
    console.log(test)
  })
  console.log('inside save function (DB)');
};

var find = function() {
 console.log('inside find function (DB)');

};

module.exports.save = save;
module.exports.find = find;
