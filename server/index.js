const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const database = require('../database/index.js');

const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Difficulty to crack (Incrementing doubles compute time)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/dist`, 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body.user;

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
      });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  // Remove user
  res.session.destroy();
  res.redirect('/login');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
