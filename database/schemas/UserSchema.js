const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
User data example
{
  ObjectId: "123kj123lh81239v123" ,
  username, "romcar" ,
  salt: "1lkj123lhf12",
  hash: "js98d7f123k9237139sbfb2i349",
  grocery-lists: [
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
    {ObjectId: "", items: [], name: "", user-id: (Users.ObjectID), total-price: #},
  ],
  last-login: timestamp,
  failed-login-attempts: #
}

*/
var UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  salt: String,
  hash: String,
  grocery_lists: [{
    type: Schema.Types.ObjectId,
    ref: 'GroceryLists'
  }],
  last_login: Date,
  failed_login_attempts: Number
});

module.exports =  mongoose.model('Users', UserSchema);