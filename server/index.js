const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const database = require('../database/index.js');

const app = express();
const path = require('path');

const bcrypt = require('bcrypt');

const saltRounds = 10; // Difficulty  to crack (Incrementing doubles compute time)

const User = require('../database/schemas/UserSchema.js');

// WE NEED BCRYPT HERE TOO

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || '0979zx7v6vvq0398ubvq7w6dc8c7z5rvg7i1',
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(`${__dirname}/../client/dist`));

app.post('/login', (req, res) => {
  const { username, password } = req.body; // might only be req.body

  // If user
  if (username && password) {
    var db = User.find({username}).exec();

    db.then(async (user) => {
        const isValiduser = await bcrypt.compare(password, user[0].hash);
        console.log('isValid', isValiduser)
        return {
          user: user[0],
          hash : user[0].hash,
          isValidUser: isValiduser,
        };
      })
      .then(({ user, hash, isValidUser }) => {
        if (!isValidUser) {
          res.end('/login');
        }
        req.session.username = username;
        req.session.hash = hash;
        console.log("here" ,user)
        let results = {'loc': '\/', 'userData': JSON.stringify(user)};
        res.end(JSON.stringify(results));
      })
      .catch((err) => {
        if(err) console.error(err, 'user does not exist.');
      });
  } else {
    res.end('/login');
  }
});

app.get('/logout', (req, res) => {
  // Remove user
  req.session.destroy();
  res.end('/login');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  /*
  What happens when a username already exists?
  */
  // If user
  if (username && password) {
    bcrypt.hash(password, saltRounds)
      .then(async hash => (
        database.saveUser({
          username,
          hash,
          grocery_list: [],
          last_login: new Date(),
          failed_login_attempts: 0,
        })
      ))
      .then((hash) => {
        req.session.username = username;
        req.session.hash = hash;

        res.end('/');
      })
      .catch();
  } else {
    res.end('/register');
  }
});

// add new categories into DB if not found in DB
app.post('/category/create', function(req, res) {
  console.log('server sided ', req.body)
  database.searchForCategory(req.body, (category) => {
    res.end(JSON.stringify(category));
  })
});

// searches the database for an item, if it doesn't exists a new item
// will be created
app.post('/search/item', (req, res) => {
  console.log('post', req.body)
  database.searchForItem(req.body, (item) => {
    console.log('callback', item)
    res.end(JSON.stringify(item));
  });
});


app.post('/lists/create', function(req, res) {
  console.log("BEFORE",req.body)
  database.createList(req.body);
  // var newList = new List({name: req.body.name, username: req.session.username});
  // console.log('AFTER', newList)
  // var name = newList.name;
  // List.findOne({name: name}, function(err, listExists) {
  //   // list doesn't exist
  //   if (!listExists.length) {
  //     newList.save()
  //     .then(function(category) {
  //       res.end('List saved to database');
  //     })
  //     .catch(function(err) {
  //       res.status(400).end('Unable to save list to database');
  //     })
  //   }
  // }).then(listExists => {
  //   List.findOneAndUpdate({name: listExists.name}, { "$set": {"items": newList.items, "name": newList.name, "user_id": newList.user_id, "total_price": newList.total_price} }, {new: true}, function(err, doc) {
  //     if (err) return res.end(500, {error: err});
  //     res.end('Updated existing list');
  //   })
  // })
});

app.get('/store/search', (req, res) => {

});


/* KEEP THIS HERE WITHOUT IT WE CANNOT REFRESH OUR PAGES WITHOUT ERRORS*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
