<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database/index.js');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

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
  res.sendFile(path.resolve(__dirname+'/../client/dist', 'index.html'));
});

const port = 3000;

app.listen(process.env.port || port, function() {
  console.log(`Listening on port ${port}`);
});


