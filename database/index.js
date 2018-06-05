// Host all database functionality

const mongoose = require('mongoose');
mongoose.Promise = Promise;
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
const Items = require('./schemas/ItemSchema.js');
const Category = require('./schemas/CategorySchema.js');

const Store = require('./schemas/StoreSchema.js');

// const ItemHistory = require('./schemas/ItemHistory.js');
const GroceryList = require('./schemas/GroceryListSchema.js');
// const Store = require('./schemas/Store.js');


var saveUser = function(user) {
  var newUser = new User(user);

  newUser.save(function(err) {
    if(err) throw err;
    console.log(newUser)
  })
  console.log('inside save function (DB)');
};

var saveCategory = function(category) {
  var newCategory = new Category(category.body);
  newCategory.save()
  .then(function(category) {
    res.end('Category saved to database');
  })
  .catch(function(err) {
    res.status(400).end('Unable to save category to database');
  })
}

var updateList = function(list) {
  var newList = new GroceryList(list.body);
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

var addItemToList = function(item) {
  var newItem = new Items(item.body);
  newItem.save(function(err) {
    if (err) return handleError(err);
    return 'Item saved to database'
  })
}

var searchForItem = (item, callback) => {
  console.log('search', item)
  Items.find({name: item.name}).exec((err, itemRecords) => {
    console.log('records', itemRecords)
    // if an item exists
    if(itemRecords.length) {
      //send the first record back
      callback(itemRecords[0]);
    } else {
      // if there is not item
      let newItem = {
        name: item.name
      }
      // create a new item record
      createItem(newItem, callback)
    }
  });
};


// create a new item record then use a callback
// to get you where you need
var createItem = (item, callback) => {
  var newItem = new Items(item);
  // the callback will be invoked after the item is saved to the db
  newItem.save((err) => {
    if(err) console.error(err);
    callback(newItem);
  });
};

var createList = () => {

};

var searchForList = (query) => {
  // query = {_id: } || {name: , user_id: }

}

var searchForStore = () => {

}

var createStore = () => {

}

var searchForItemInHistory = () => {

}
var createHistoryItem = () => {

}

module.exports.saveUser = saveUser;
module.exports.saveCategory = saveCategory;
module.exports.storeSearch = Store.find;
module.exports.storeSave = Store.save;
module.exports.updateList = updateList;
module.exports.addItemToList = addItemToList;
module.exports.searchForItem = searchForItem;
