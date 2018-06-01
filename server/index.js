const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const database = require('../database/index.js');

const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

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
  // Validate user
  const user = req.body.user;
  const password = req.body.password;

  if (user && password) {

  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  // Remove user
  res.session.destroy();
});

app.post('/register', (req, res) => {
  // Create new user
  const user = req.body.user;
  const password = req.body.password;

  if (user && password) {

  } else {
    res.redirect('/register');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
