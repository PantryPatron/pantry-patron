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
  })
};


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
  Items.find({name: item.name}).exec((err, itemRecords) => {
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

var createList = (query) => {
  searchForUserById(query.user_id, (user) => {

    var newList = new GroceryList({name: query.name});
      console.log(newList, '<======================', user)
      user.grocery_lists.push(newList);

    newList.save((err) => {
      if(err)  console.error(err);
    });
  })
};

var searchForUserById = (query, callback) => {
  console.log('search for user', query)
  // query = {name: , user_id: }
  User.findById(query).exec((err, user) => {
    if(err) {console.error(err)};

    callback(user);
  });
 }

var searchForStore = () => {

}

var createStore = () => {

}

var searchForItemInHistory = () => {

}
var createHistoryItem = () => {

}

var searchForCategory = (query, callback) => {
  // query needs to be an obj {name: categoryName}
  //if not it will be converted so we can do a find all
  query = query.name ? query : {};

  Category.find(query).exec((err, categories) => {
    if(!categories.length){
        // if a name is provided
      if(query.name) {
        //create new category
        createCategory(query, callback)
      } else {
        // else error out or maybe return error so we can display it
        console.error('cannot create empty category')
      }
    } else {
      // if they made a query with an item name
      if(query.name) {
        //return the first item in the array.
        callback(categories[0]);
      } else  {
        // else return every category
        callback(categories);
      }
    }
  });

}

var createCategory = function(query, callback) {
  // create new category document
  var newCategory = new Category(query);
  //save the category document
  newCategory.save((err) => {
    if(err) console.error(err);

    callback(newCategory);
  })

}

module.exports.saveUser = saveUser;
module.exports.searchForCategory = searchForCategory;
module.exports.searchForUserById = searchForUserById;
module.exports.storeSearch = Store.find;
module.exports.storeSave = Store.save;
module.exports.updateList = updateList;
module.exports.addItemToList = addItemToList;
module.exports.createList = createList;
module.exports.searchForItem = searchForItem;
