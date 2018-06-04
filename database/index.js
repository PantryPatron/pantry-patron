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



var saveUser = function(user) {
  var test = new User(user);
  test.save(function(err) {
    if(err) throw err;
    console.log(test)
  })
  console.log('inside save function (DB)');
};

var saveCategory = function(category) {
  var newCategory = new Category(req.body);
  newCategory.save()
  .then(function(category) {
    res.end('Category saved to database');
  })
  .catch(function(err) {
    res.status(400).end('Unable to save category to database');
  })
}

var updateList = function() {
  var newList = new GroceryList(req.body);
  var name = newList.name;
  List.findOne({name: name}, function(noList, listExists) {
    // list doesn't exist
    if (noList) {
      newList.save()
      .then(function(category) {
        res.end('List saved to database');
      })
      .catch(function(err) {
        res.status(400).end('Unable to save list to database');
      })
    }
  }).then(listExists => {
    List.findOneAndUpdate({name: listExists.name}, { "$set": {"items": newList.items, "name": newList.name, "user_id": newList.user_id, "total_price": newList.total_price} }, {new: true}, function(err, doc) {
      if (err) return res.end(500, {error: err});
      res.end('Updated existing list');
    })
  }).catch(err => console.error(err));
}

var find = function() {
 console.log('inside find function (DB)');
};

module.exports.saveUser = saveUser;
module.exports.saveCategory = saveCategory;

module.exports.find = find;
module.exports.storeSearch = Store.find;
module.exports.storeSave = Store.save;


module.exports.updateList = updateList;
module.exports.find = find;
