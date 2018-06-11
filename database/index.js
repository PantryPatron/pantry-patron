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
const Store = require('./schemas/StoreSchema.js');
const ItemHistory = require('./schemas/ItemHistorySchema.js');
const GroceryList = require('./schemas/GroceryListSchema.js');

const saveUser = function (user) {
  const newUser = new User(user);

  newUser.save((err, docs) => {
    if (err) throw err;

    console.log('User saved to database.');
  });
};

const addItemToList = function (item) {
  const newItem = new Items(item.body);
  newItem.save((err) => {
    if (err) return handleError(err);
    return 'Item saved to database';
  });
};

const searchForItem = (item, callback) => {
  Items.find({ name: item.name }).exec((err, itemRecords) => {
    // if an item exists
    if (itemRecords.length) {
      // send the first record back
      callback(itemRecords[0]);
    } else {
      // if there is not item
      const newItem = {
        name: item.name,
      };
      // create a new item record
      createItem(newItem, callback);
    }
  });
};


// create a new item record then use a callback
// to get you where you need
var createItem = (item, callback) => {
  const newItem = new Items(item);
  // the callback will be invoked after the item is saved to the db
  newItem.save((err) => {
    if (err) console.error(err);

    callback(newItem);
  });
};

const createList = (query, callback) => {
  // queries user collection and searches for ObjectId
  searchForUserById(query.user_id, (user) => {
    const newList = new GroceryList({ name: query.name });
    user.grocery_lists.push(newList);

    newList.save((err) => {
      if (err) console.error(err);
      user.save();
      callback(newList);
    });
  });
};

const deleteListById = async (_id) => {
  await GroceryList.find({ _id })
    .then(([list]) => {
      list.items.forEach((_id) => {
        ItemHistory.find({ _id }).remove();
      });
      list.remove();
    });
  return _id;
};

var searchForUserById = (query, callback) => {
  // query = {name: , user_id: }
  User.findById(query).exec((err, user) => {
    if (err) { console.error(err); }
    callback(user);
  });
};

const searchForListsAndPopulate = (listIds, callback) => {

  GroceryList.find({ _id: { $in: listIds } })
    .populate({
      path: 'items',
      populate: {
        path: 'item_id',
      },
    })
    .populate('store_id')
    .exec((err, data) => {
      callback(data);
    });
};

const searchForItemInHistoryAndPopulate = (item, shouldUpdate, callback) => {
  ItemHistory.find({_id: item._id})
  .populate('item_id')
  .exec((err, oldItem) => {
    if(err) { console.error(err) };
      if (shouldUpdate) {
        oldItem[0].item_id.name = item.name;

        oldItem[0].item_id.save((err) => {
          if (err) { console.error(err); }
        });

        oldItem[0].price = item.price;
        oldItem[0].quantity = item.quantity;

        oldItem[0].save((err) => {
          if (err) { console.error(err); }
          callback(oldItem);
        });
      } else {
        callback(oldItem);
      }
    });
};

const searchForItemInHistory = (item, callback) => {
  /* CHECKS THE ITEMHISTORY TO SEE IF THE ITEM EXISTS
    IF NOT IT SHOULD CREATE A NEW ITEMHISTORY DOCUMENT */
  ItemHistory.find({ item_id: item.newItem._id }).exec((err, histItem) => {
    console.log(histItem, 'stage 1~~~~~~~~~~~~~~~~~~~~~')
    if (!histItem.length) {
      console.log(histItem, 'stage 2a~~~~~~~~~~~~~~~~~~~~~')
      // add item functionality
      createHistoryItem(item, (newHistItem) => {
        // find the current grocery list
        GroceryList.find({ _id: item.list }).exec((err, list) => {
          list[0].items.push(newHistItem);
          list[0].save((err) => {
            if (err) { console.error(err); }
            callback(list[0]);
          });
        });
      });
    } else {
      console.log(histItem,'12312312312', item, 'stage 2b~~~~~~~~~~~~~~~~~~~~~');
      GroceryList.find({ _id: item.list }).exec((err, list) => {
        console.log('found this item', list)
        console.log(histItem)
          list[0].items.push(histItem[0]);
          list[0].save((err) => {
            console.log('im in save')
            if (err) { console.error(err); }
            callback(list[0]);
          });
        });
      // callback(histItem[0]);
    }
  });
};
var createHistoryItem = (item, callback) => {
  const newHistItem = new ItemHistory({ item_id: item.newItem._id });
  newHistItem.save((err) => {
    if (err) { console.error(err); }
    callback(newHistItem);
  });
};

const updateList = function (list, callback) {
  const updateParams = {};

  if (list.name) { updateParams.name = list.name; }
  if (list.items) { updateParams.items = list.items; }
  if (list.total_price) { updateParams.total_price = list.total_price; }
  if (list.store_id) {
    if (list.store_id._id !== 'select') {
      updateParams.store_id = list.store_id._id;
    }
  }

  GroceryList.update({ _id: list._id }, updateParams, { upsert: true }, (err, updatedList) => {
    if (callback) {
      callback(updatedList);
    }
  });
}

const storeSave = async store => (await (new Store(store)).save());

module.exports.saveUser = saveUser;
module.exports.searchForUserById = searchForUserById;
module.exports.storeSearch = Store.find.bind(Store);
module.exports.storeSave = storeSave;
module.exports.addItemToList = addItemToList;
module.exports.createList = createList;
module.exports.deleteListById = deleteListById;
module.exports.searchForItem = searchForItem;
module.exports.searchForListsAndPopulate = searchForListsAndPopulate;
module.exports.searchForItemInHistory = searchForItemInHistory;
module.exports.searchForItemInHistoryAndPopulate = searchForItemInHistoryAndPopulate;
module.exports.updateList = updateList;
module.exports.searchUser = User.findOne.bind(User);