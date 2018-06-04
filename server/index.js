const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const database = require('../database/index.js');

const app = express();
const path = require('path');

const bcrypt = require('bcrypt');

const saltRounds = 10; // Difficulty  to crack (Incrementing doubles compute time)

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
// app.get('/home', function(req, res) {
//   database.find();
//   res.end('Hello from the home page!');
// });

// app.get('/login', function(req, res) {
//   res.end('Hello world from the PantryPatron login page!')
// });

// app.get('/register', function (req, res) {
//   res.end('Hello from the register page!');
// });

// app.get('/logout', function(req, res) {
//   res.end('Hello from the logout page!');
// });

// app.get('/list', function(req, res) {
//   res.end('Hello from the lists page!');
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(`${__dirname}/../client/dist`, 'index.html'));
// });

app.post('/login', (req, res) => {
  const { username, password } = req.body.user; // might only be req.body

  // If user
  if (username && password) {
    database.find(username)
      .then(async ({ hash }) => {
        const isValiduser = await bcrypt.compare(password, hash);

        return {
          hash,
          isValidUser: isValiduser,
        };
      })
      .then(({ hash, isValidUser }) => {
        if (!isValidUser) {
          res.redirect('/login');
        }

        res.session.username = username;
        res.session.hash = hash;
        res.redirect('/');
      });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  // Remove user
  req.session.destroy();
  res.redirect('/login');
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
        database.save({
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

        res.redirect('/');
      });
  } else {
    res.redirect('/register');
  }
});

// add new categories into DB if not found in DB
app.post('/category/create', function(req, res) {
  database.saveCategory(req)
  .then(function(category) {
    res.end('Create category in database')
  })
  .catch(function(err) {
    res.status(400).end('Unable to create category in database');
  })
});


app.post('/lists/update', function(req, res) {
  database.updateList(req)
  .then(function(list) {
    res.end('Updated list in database')
  })
  .catch(function(err) {
    res.status(400).end('Unable to update list in database');
  })
});

app.post('/item/add', function(req, res) {
  // add item to database list
});


app.post('/store/create', (req, res) => {
  const { store, items } = req.body;

  database.storeSearch({ store })
    .then((stores) => {
      if (stores) {
        // If store already exists
        return res.send(undefined);
      }

      // If no store create a new one
      database.save({ store, items })
        .then(() => {
          res.send('Sucess!');
        });
    })
});

app.get('/store/search', (req, res) => {

});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
