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


var saveUser = function(user) {
  var test = new User(user);
  test.save(function(err) {
    if(err) throw err;
    console.log(test)
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

var find = function() {
 console.log('inside find function (DB)');
};

module.exports.saveUser = saveUser;
module.exports.saveCategory = saveCategory;

module.exports.find = find;
module.exports.storeSearch = Store.find;
module.exports.storeSave = Store.save;


module.exports.updateList = updateList;
module.exports.addItemToList = addItemToList;
module.exports.find = find;

var searchForItemAndCreate = (item) => {
console.log('before ===> ',item);

  Items.find({name: item.name}).exec(function(err, itemList){
    console.log(itemList, 'found this')
    if(!itemList.length) {
      var newItem = new Items({name: item.name});

      newItem.save((err) => {
        if(err) console.error(err);
        console.log(newItem);
      })
    } else {
      console.log('found this here ', itemList[0])
    }
  });
};

module.exports.save = save;
// module.exports.find = User.findOne;
module.exports.searchForItemAndCreate = searchForItemAndCreate;
